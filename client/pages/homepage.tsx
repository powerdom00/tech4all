import React from "react";
import { useRouter } from "next/router";
import "../src/app/css/Homepage.css";
import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";

export default function Homepage() {
  const router = useRouter();

  const images = [
    {
      src: "/Media/ciao.jpg",
      alt: "Tutorial login",
      link: "",
    },
    {
      src: "/Media/LogoT4A.jpeg",
      alt: "Logo",
      link: "",
    },
    {
      src: "/Media/f1.webp",
      alt: "Logo",
      link: "",
    },
    {
      src: "/Media/f2.jfif",
      alt: "Logo",
      link: "",
    },
    {
      src: "/Media/f3.jfif",
      alt: "Logo",
      link: "",
    },
    {
      src: "/Media/f5.jfif",
      alt: "Logo",
      link: "",
    },
  ];

  const handleImageClick = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <Header />
      <div>
        <main className="imageGallery">
          {images.map((image, index) => (
            <div
              key={index}
              className="imageCard"
              onClick={() => handleImageClick(image.link)}
            >
              <img src={image.src} alt={image.alt} />
              <p>{image.alt}</p>
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
}
