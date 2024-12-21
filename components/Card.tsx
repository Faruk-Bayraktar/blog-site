// import React from "react";
// import Image from "next/image";
// import {
//   Card as CardBox,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// interface CardProps {
//   title: string;
//   images: string[];
// }

// const Card: React.FC<CardProps> = ({ title, images }) => {
//   return (
//     <CardBox className="mt-10 rounded-sm">
//       <CardHeader>
//         {images.map((image, index) => (
//           <div className="relative h-44" key={index}>
//             <Image
//               alt={title}
//               src={image}
//               fill
//               loading="lazy"
//               sizes="(max-width: 768px) 100vw, 50vw"
//               style={{
//                 objectFit: "cover",
//               }}
//             />
//           </div>
//         ))}
//       </CardHeader>
//       <CardContent>
//         <CardTitle className="scroll-m-20 text-md font-extrabold tracking-tight lg:text-1xl">
//           {title}
//         </CardTitle>
//       </CardContent>
//     </CardBox>
//   )

// };

// export default Card;
import React from "react";

interface CardProps {
  title: string;
  images: string[];
}

export default function Card({ title, images }: CardProps) {
  return (
    <div className="card shadow-lg">
      {images[0] && <img src={images[0]} alt={title} className="card-img-top" />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}
