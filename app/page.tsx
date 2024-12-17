"use client";
import { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

export interface Post {
  title: string;
  description: string;
  content: string;
  link: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRSS() {
      try {
        const response = await fetch("/api/rss");
        if (!response.ok) {
          console.error("Failed to fetch RSS:", response.statusText);
          return;
        }

        const xmlData = await response.text();
        const result = await parseStringPromise(xmlData);
        console.log("Parsed XML:", result);

        const entries = result?.feed?.entry || [];
        const formattedPosts = entries.map((entry: any) => ({
          title: entry.title?.[0]?._ || "No title",
          description: entry.summary?.[0]?._ || "No description",
          content: entry.content?.[0]?._ || "No content available", // İçeriği ekle
          link: entry.link?.[0]?.$?.href || "#",
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching RSS:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRSS();
  }, []);

  return (
    <div>
      <h1>RSS Posts</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <h2>{post.title}</h2>
              <p>
                <strong>Summary:</strong> {post.description}
              </p>
              <div>
                <strong>Content:</strong>
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
              </div>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
