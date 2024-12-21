// filepath: /c:/blog-site/app/posts/[category]/page.tsx
"use client";
import * as React from "react";
import PageTemplate from "@/components/PageTemplate";
import { useParams } from "next/navigation";

const CategoryPage = () => {
    const params = useParams();
    let { category } = params;
    if (Array.isArray(category)) {
        category = category.join(", ");
    }

    return <PageTemplate category={category} />;
};

export default CategoryPage;