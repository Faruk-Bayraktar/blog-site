import React from "react";
import parse from "html-react-parser";
import "./CardDetail.css";

interface Post {
  // Post tipi
  cardId: string;
  title: string;
  images: string[];
  content: string;
}

interface CardDetailProps {
  // CardDetail bileşeni için props
  post: Post;
}

const CardDetail: React.FC<CardDetailProps> = ({ post }) => {
  // CardDetail bileşeni
  const addedImages = new Set<string>();

  const contentElements = parse(post.content, {
    // İçerik elemanlarını oluşturma
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name === "img") {
        const src = domNode.attribs.src;
        if (!addedImages.has(src)) {
          addedImages.add(src);
          {
            /* Resim URL'lerini ekleme */
          }
          return (
            <img
              src={src}
              alt={domNode.attribs.alt}
              className="content-image"
            />
          );
        }
        return null;
      }
      if (domNode.type === "tag" && domNode.name === "p") {
        return (
          <p className="content-text">
            {domNode.children
              .map((child) => (child as unknown as Text).data) // Metin içeriği
              .join("")}
          </p>
        );
      }
    },
  });

  return (
    <div className="card-detail">
      <h1 className="title">{post.title}</h1> {/* Başlık */}
      {contentElements}
    </div>
  );
};

export default CardDetail;
