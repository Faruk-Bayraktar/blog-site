"use client";

import React, { useState, useEffect } from "react";
import { parseStringPromise } from "xml2js";
import Card from "@/components/Card";

export interface Post {
  title: string;
  images: string[]; // Sadece img URL'lerini tutacak
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

        const entries = result?.feed?.entry || [];
        const formattedPosts = entries.map((entry: any) => {
          const rawContent = entry.content?.[0]?._ || "";
          const imgUrls = extractImageUrls(rawContent);

          return {
            title: entry.title?.[0]?._ || "No title",
            images: imgUrls,
          };
        });

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching RSS:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRSS();
  }, []);

  // İçeriği analiz ederek img etiketlerini ve src değerlerini ayıklayan fonksiyon
  function extractImageUrls(content: string): string[] {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    const imgUrls: string[] = [];
    let match;

    while ((match = imgRegex.exec(content)) !== null) {
      imgUrls.push(match[1]); // src değerini listeye ekle
    }

    return imgUrls;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
      {posts.map((post, index) => (
        <Card key={index} title={post.title} images={post.images} />
      ))}
    </div>
  );
}
