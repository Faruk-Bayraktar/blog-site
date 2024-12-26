"use client";
import React, { useState, useEffect } from 'react';
import PageTemplate from "@/components/PageTemplate";
import Loading from '@/components/Loading';
// import CategoryPage from './posts/[category]/page';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {/* <CategoryPage /> */}
      a
    </div>
  );
}