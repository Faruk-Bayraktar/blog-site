import React from "react";
import Image from "next/image";
import {
  Card as CardBox,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
interface CardProps {
  title: string;
  images: string[];
}

const Card: React.FC<CardProps> = ({ title, images }) => {
  return (
    <CardBox className="mt-10 rounded-sm">
      <CardHeader>
        {images.map((image, index) => (
          <div className="relative h-44" key={index}>
            <Image
              alt={title}
              src={image}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </CardHeader>
      <CardContent>
        <CardTitle className="scroll-m-20 text-md font-extrabold tracking-tight lg:text-1xl">
          {title}
        </CardTitle>
      </CardContent>
    </CardBox>
  )

};

export default Card;
{/* <div className="card mt-10 rounded-sm p-4 shadow-lg">
{images.map((image, index) => (
  <div className="relative h-44 mb-4" key={index}>
    <Image
      alt={title}
      src={image}
      fill
      loading="lazy"
      style={{
        objectFit: "cover",
      }}
    />
  </div>
))}
<h2 className="scroll-m-20 text-md font-extrabold tracking-tight lg:text-1xl mt-2">
  {title}
</h2>
</div> */}