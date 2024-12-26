"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

interface CardProps {
  title: string;
  images: string[];
}

export default function Card({ title, images }: CardProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = images[0];
    img.onload = () => setLoading(false);
  }, [images]);

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200 overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <>
          {images[0] && (
            <img
              src={images[0]}
              alt={title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h5 className="text-lg font-semibold text-gray-800">{title}</h5>
          </div>
        </>
      )}
    </div>
  );
}
