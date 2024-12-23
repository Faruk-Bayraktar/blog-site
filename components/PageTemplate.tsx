"use client";

import React, { useState, useEffect } from "react";
import { parseStringPromise } from "xml2js";
import Card from "@/components/Card";
import Loading from "./Loading";

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

    return (
        <div className="container my-12 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
                <Card key={index} title={post.title} images={post.images} />
            ))}
        </div>
    );
}
