import React from "react";
import Link from "next/link"; // Usa Link invece di useRouter
import "../src/app/css/Homepage.css";
import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";

export default function Homepage() {
  const images = [
    {
      src: "/Media/ciao.jpg",
      alt: "Chi Siamo",
      link: "/chisiamo", // Collegamento alla pagina Chi Siamo
    },
    {
      src: "/Media/f1.webp",
      alt: "Tutorials",
      link: "/ListaTutorial", // Collegamento alla pagina Tutorials
    },
  ];

  return (
    <>
      <Header />
      <div className="homepage-container">
        <main className="centered-images">
          {images.map((image, index) => (
            <Link href={image.link} key={index} passHref>
              <div className="large-image-card">
                <img src={image.src} alt={image.alt} className="large-image" />
                <p>{image.alt}</p>
              </div>
            </Link>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
}
