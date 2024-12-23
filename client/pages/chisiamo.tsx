import React from "react";
import "../src/app/css/ChiSiamo.css";

const ChiSiamo: React.FC = () => {
  // Dati delle immagini con descrizioni
  const mainImages = [
    { src: "/Media/photo.jfif", alt: "PM 1", description: "Project Manager 1" },
    { src: "/Media/photo.jfif", alt: "PM 2", description: "Project Manager 2" },
  ];

  const gridImages = [
    { src: "/Media/photo.jfif", alt: "Team Member 1", description: "Team Member 1" },
    { src: "/Media/photo.jfif", alt: "Team Member 2", description: "Team Member 2" },
    { src: "/Media/photo.jfif", alt: "Team Member 3", description: "Team Member 3" },
    { src: "/Media/photo.jfif", alt: "Team Member 4", description: "Team Member 4" },
    { src: "/Media/photo.jfif", alt: "Team Member 5", description: "Team Member 5" },
    { src: "/Media/photo.jfif", alt: "Team Member 6", description: "Team Member 6" },
    { src: "/Media/photo.jfif", alt: "Team Member 7", description: "Team Member 7" },
    { src: "/Media/photo.jfif", alt: "Team Member 8", description: "Team Member 8" },
  ];

  return (
    <div className="chi-siamo-container">
      <h1>Chi siamo</h1>
      <p>
        Benvenuti su Tech4All! Siamo un team dedicato alla creazione di soluzioni tecnologiche innovative. La nostra missione è quella di rendere la tecnologia accessibile a tutti, indipendentemente dall'età, dalle competenze o dalle necessità.
      </p>
      <div className="image-row centered">
        {mainImages.map((image, index) => (
          <div key={index} className="image-with-caption">
            <img src={image.src} alt={image.alt} className="main-image" />
            <p className="image-caption">{image.description}</p>
          </div>
        ))}
      </div>
      <div className="image-grid">
        {gridImages.map((image, index) => (
          <div key={index} className="image-with-caption">
            <img src={image.src} alt={image.alt} className="grid-image" />
            <p className="image-caption">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChiSiamo;
