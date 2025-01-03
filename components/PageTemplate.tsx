"use client";
import React, { useState, useEffect } from "react";
import { parseStringPromise } from "xml2js";
import Card from "@/components/Card";
import Loading from "./Loading";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { usePosts } from "@/context/PostsContext";

export interface Post {
  cardId: string;
  title: string;
  images: string[];
  content: string;
}

interface PageTemplateProps {
  category?: string;
}

const PageTemplateContent: React.FC<PageTemplateProps> = ({ category }) => {
  const { cat } = useParams<{ cat: string }>();
  const router = useRouter();
  const { posts, setPosts } = usePosts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [randomTitleIndex, setRandomTitleIndex] = useState(9);

  useEffect(() => { // RSS verilerini çekme
    async function fetchRSS() {
      if (!category) {
        setError("Kategori belirtilmedi.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/rss?category=${category}`); //Burada rss route.ts dosyasına gidip oradan veri çekiyoruz
        if (!response.ok) {
          throw new Error(`Hata: ${response.statusText}`);
        }

        const { data: xmlData } = await response.json();

        const result = await parseStringPromise(xmlData, { // XML verisini JSON'a çevirme
          explicitArray: false,
          trim: true,
        });

        const entries = result?.feed?.entry;
        if (!entries) {
          throw new Error("Beklenen formatta veri bulunamadı.");
        }

        const items = Array.isArray(entries) ? entries : [entries]; // RSS verilerini diziye çevirme

        const formattedPosts = items.map((item: any, index: number) => ({
          cardId: `card-${index}`,
          title:
            typeof item.title === "string"
              ? item.title
              : item.title?._ || "Başlık yok",
          images: extractImageUrls(item.content?._ || ""),
          content: item.content?._ || "İçerik yok",
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("RSS Fetch Hatası:", err);
        if (err instanceof Error) {
          setError(err.message || "Bilinmeyen bir hata oluştu.");
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRSS();
  }, [category]);

  useEffect(() => { // Başlık değiştirme
    const interval = setInterval(() => {
      setRandomTitleIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 10000); // 10 saniyede bir başlık değiştir
    return () => clearInterval(interval);
  }, [posts]);

  function extractImageUrls(content: string): string[] { // İçerikten resim URL'lerini çıkarma
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    const imgUrls: string[] = [];
    let match;

    while ((match = imgRegex.exec(content)) !== null) { // Resim URL'lerini bulma
      let imgUrl = match[1];

      //imgix kullanarak kaliteyi düşürme
      if (imgUrl.includes("imgix.net")) {
        imgUrl += "?q=30"; // kaliteyi %50'ye düşür
      }

      //Cloudinary kullanarak kaliteyi düşürme
      if (imgUrl.includes("res.cloudinary.com")) {
        imgUrl = imgUrl.replace("/upload/", "/upload/q_50/"); // kaliteyi %50'ye düşür
      }

      imgUrls.push(imgUrl);
    }

    return imgUrls;
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Hata: {error}</div>;
  }

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1)); // Resimleri değiştirme
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1)); // Resimleri değiştirme
  };

  const handleTitlePrevClick = () => {
    setRandomTitleIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1 // Başlıkları değiştirme
    );
  };

  const handleTitleNextClick = () => {
    setRandomTitleIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const handlePostClick = (cardId: string) => { // Post sayfasına yönlendirme
    router.push(`/post/${cardId}`);
  };

  return (
    <div>
      <div className="flex justify-center my-4 items-center relative w-full">
        <div className="relative w-6/12 h-auto mx-2">
          <div onClick={() => handlePostClick(posts.slice(0, 5)[currentImageIndex].cardId)}>
            <img
              src={posts.slice(0, 5)[currentImageIndex].images[0]}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full text-center">
            {posts.slice(0, 5)[currentImageIndex].title}
          </div>
          <button
            onClick={handlePrevClick}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full">
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full">
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="w-7/12 mx-auto my-4 bg-gray-200 p-2 text-center relative">
        <button
          onClick={handleTitlePrevClick}
          className="mx-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
          <FaArrowUp />
        </button>
        <button onClick={() => window.location.href = `/post/${posts[randomTitleIndex].cardId}`}>
          {posts.length > 0 && posts[randomTitleIndex].title}
        </button>
        <button
          onClick={handleTitleNextClick}
          className="mx-1 absolute left-0 bottom-1/2 transform translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
          <FaArrowDown />
        </button>
      </div>
      <div className="w-7/12 my-12 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts.slice(5).map((post) => (
          <div onClick={() => handlePostClick(post.cardId)} key={post.cardId}>
            <div className="transform transition-transform duration-300 hover:scale-105">
              <Card title={post.title} images={post.images} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PageTemplate: React.FC<PageTemplateProps> = (props) => (
  <PageTemplateContent {...props} />
);

export default PageTemplate;