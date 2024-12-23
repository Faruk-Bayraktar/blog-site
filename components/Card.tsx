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
    // Simulate image loading
    const img = new Image();
    img.src = images[0];
    img.onload = () => setLoading(false);
  }, [images]);

  return (

    <div className="card shadow-lg">
      {loading ? (<Loading />) : (<>
        {images[0] && <img src={images[0]} alt={title} className="card-img-top" />}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div></>)
      }

    </div>
  );
}
