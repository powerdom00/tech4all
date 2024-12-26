import React from "react";
import "../src/app/css/ChiSiamo.css";

const ChiSiamo: React.FC = () => {
  const mainImages = [
    { src: "/Media/photo.jfif", alt: "PM 1", description: "PM Ferdinando Boccia" },
    { src: "/Media/photo.jfif", alt: "PM 2", description: "PM Domenico D'Antuono" },
  ];

  const gridImages = [
    { src: "/Media/photo.jfif", alt: "Team Member 1", description: "Giovanni Cerchia" },
    { src: "/Media/photo.jfif", alt: "Team Member 2", description: "Luigi Nasta" },
    { src: "/Media/photo.jfif", alt: "Team Member 3", description: "Silvana De Martino" },
    { src: "/Media/photo.jfif", alt: "Team Member 4", description: "Giovanni Salsano" },
    { src: "/Media/photo.jfif", alt: "Team Member 5", description: "Giovanni Esposito" },
    { src: "/Media/photo.jfif", alt: "Team Member 6", description: "Giuseppe Staiano" },
    { src: "/Media/photo.jfif", alt: "Team Member 7", description: "Marco Capuano" },
    { src: "/Media/photo.jfif", alt: "Team Member 8", description: "Arcangelo Ciaramella" },
  ];

  return (
    <div className="chi-siamo-container">
      <header className="hero-section">
        <h1 className="hero-title">Chi Siamo</h1>
        <p className="hero-subtitle">
          <span className="highlight">Tech4All</span> è il futuro della tecnologia inclusiva.
          Innoviamo con passione per rendere il mondo digitale accessibile a tutti.
        </p>
      </header>

      <section className="team-section">
        <h2 className="section-title">I nostri Project Manager</h2>
        <div className="image-row">
          {mainImages.map((image, index) => (
            <div key={index} className="image-card">
              <img src={image.src} alt={image.alt} className="main-image" />
              <p className="image-description">{image.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-grid-section">
        <h2 className="section-title">Il Nostro Team</h2>
        <div className="image-grid">
          {gridImages.map((image, index) => (
            <div key={index} className="image-card">
              <img src={image.src} alt={image.alt} className="grid-image" />
              <p className="image-description">{image.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
