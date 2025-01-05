import React from "react";
import styles from "../src/css/Chisiamo.module.css";
import Link from "next/link";

const ChiSiamo: React.FC = () => {
  const mainImages = [
    {
      src: "/Media/photo.jfif",
      alt: "PM 1",
      description: "PM Ferdinando Boccia",
    },
    {
      src: "/Media/photo.jfif",
      alt: "PM 2",
      description: "PM Domenico D'Antuono",
    },
  ];

  const gridImages = [
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 1",
      description: "Giovanni Cerchia",
    },
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 2",
      description: "Luigi Nasta",
    },
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 3",
      description: "Silvana De Martino",
    },
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 4",
      description: "Giovanni Salsano",
    },
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 5",
      description: "Giovanni Esposito",
    },
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 6",
      description: "Giuseppe Staiano",
    },
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 7",
      description: "Marco Capuano",
    },
    {
      src: "/Media/photo.jfif",
      alt: "Team Member 8",
      description: "Arcangelo Ciaramella",
    },
  ];

  return (
    <>
      <div className={styles.chiSiamoContainer}>
        <header className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Chi Siamo</h1>
          <p className={styles.heroSubtitle}>
            <span className={styles.highlight}>Tech4All</span> è il futuro della
            tecnologia inclusiva. Innoviamo con passione per rendere il mondo
            digitale accessibile a tutti.
          </p>
        </header>

        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>I nostri Project Manager</h2>
          <div className={styles.imageRow}>
            {mainImages.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.mainImage}
                />
                <p className={styles.imageDescription}>{image.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.teamGridSection}>
          <h2 className={styles.sectionTitle}>Il Nostro Team</h2>
          <div className={styles.imageGrid}>
            {gridImages.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.gridImage}
                />
                <p className={styles.imageDescription}>{image.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <center>
        <div className={styles.homeButtonContainer}>
          <Link href="/homepage">
            <button className={styles.homeButton}>Torna alla homepage</button>
          </Link>
        </div>
      </center>
    </>
  );
};

export default ChiSiamo;
