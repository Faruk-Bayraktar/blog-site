// filepath: /c:/blog-site/app/posts/[category]/page.tsx
"use client";
import * as React from "react";
import PageTemplate from "@/components/PageTemplate";
import { useParams } from "next/navigation";

const CategoryPage = () => {
    const params = useParams(); //Burada url den category'yi alıyoruz.
    let { category } = params; //Burada category'yi alıyoruz.
    if (Array.isArray(category)) { //Burada category array ise join ile stringe çeviriyoruz.
        category = category.join(", ");
    }

    return <PageTemplate category={category} />; //Burada category'yi PageTemplate'a gönderiyoruz.
};

export default CategoryPage;