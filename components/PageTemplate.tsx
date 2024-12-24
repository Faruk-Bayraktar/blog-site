"use client";

import React, { useState, useEffect } from "react";
import { parseStringPromise } from "xml2js";
import Card from "@/components/Card";
import Loading from "./Loading";
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown } from 'react-icons/fa';
export interface Post {
    title: string;
    images: string[];
    content: string;
}

interface PageTemplateProps {
    category?: string;
}

export default function PageTemplate({ category }: PageTemplateProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [randomTitleIndex, setRandomTitleIndex] = useState(9);

    useEffect(() => {
        async function fetchRSS() {
            if (!category) {
                setError("Kategori belirtilmedi.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/rss?category=${category}`);
                if (!response.ok) {
                    throw new Error(`Hata: ${response.statusText}`);
                }

                const { data: xmlData } = await response.json();

                console.log("Gelen Atom XML:", xmlData); // XML yapısını kontrol edin

                const result = await parseStringPromise(xmlData, {
                    explicitArray: false,
                    trim: true,
                });

                const entries = result?.feed?.entry;
                if (!entries) {
                    throw new Error("Beklenen formatta veri bulunamadı.");
                }

                // Eğer tek bir `entry` varsa, onu diziye dönüştür
                const items = Array.isArray(entries) ? entries : [entries];

                const formattedPosts = items.map((item: any) => ({
                    // title'ın metin olarak işlendiğinden emin olun
                    title: typeof item.title === "string" ? item.title : item.title?._ || "Başlık yok",

                    // content'in görsel URL'lerini çıkar
                    images: extractImageUrls(item.content?._ || ""),

                    // content'in saf metin olduğundan emin olun
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

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomTitleIndex((prevIndex) => (prevIndex + 1) % posts.length);
        }, 10000); // 10 saniyede bir başlık değiştir
        return () => clearInterval(interval);
    }, [posts]);

    function extractImageUrls(content: string): string[] {
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
        const imgUrls: string[] = [];
        let match;

        while ((match = imgRegex.exec(content)) !== null) {
            imgUrls.push(match[1]);
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
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
    };

    const handleTitlePrevClick = () => {
        setRandomTitleIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
    };

    const handleTitleNextClick = () => {
        setRandomTitleIndex((prevIndex) => (prevIndex + 1) % posts.length);
    };

    return (
        <div>
            <div className="flex justify-center my-4 items-center relative w-full">
                <div className="relative w-6/12 h-auto mx-2">
                    <img src={posts.slice(0, 5)[currentImageIndex].images[0]} alt={`Image ${currentImageIndex + 1}`} className="w-full h-auto" />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full text-center">
                        {posts.slice(0, 5)[currentImageIndex].title}
                    </div>
                    <button onClick={handlePrevClick} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full">
                        <FaArrowLeft />
                    </button>
                    <button onClick={handleNextClick} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full">
                        <FaArrowRight />
                    </button>
                </div>
            </div>
            <div className="w-7/12 mx-auto my-4 bg-gray-200 p-2 text-center relative">
                <button onClick={handleTitlePrevClick} className="mx-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                    <FaArrowUp />
                </button>
                {posts.length > 0 && posts[randomTitleIndex].title}
                <button onClick={handleTitleNextClick} className="mx-1 absolute left-0 bottom-1/2 transform translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                    <FaArrowDown />
                </button>
            </div>
            <div className="w-7/12 my-12 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {posts.slice(5).map((post, index) => (
                    <Card key={index} title={post.title} images={post.images} />
                ))}
            </div>
        </div>
    );
}
