import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import styles from "../src/css/index.module.css"; // Aggiungi qui il tuo CSS
import { AuthProvider } from "./context/AuthContext";
const App: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleChoice = (choice: string) => {
    if (choice === "si") {
      router.push("/register"); // Redirect alla pagina di registrazione
    } else if (choice === "no") {
      setMessage(
        "Per imparare a registrarti, guarda il video tutorial che trovi al centro della pagina."
      );
    }
  };

  const closePopup = () => {
    setPopupVisible(false); // Funzione per chiudere il popup
  };

  return (
    <div className={styles.container}>
      <AuthProvider>
        <Header />
        <main>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Tech4All</h1>
              <p className={styles.heroSubtitle}>
                Byte per Byte, verso il futuro.
              </p>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.videoContainer}>
              <iframe
                width="700"
                height="350"
                src="https://www.youtube.com/embed/UGemfFm23bY?si=Ioyq5iCyjI_TTynW"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <h2 className={styles.cardTitle}>Chi siamo?</h2>
            <p className={styles.cardText}>
              Tech4All è un sito dedicato a migliorare l'alfabetizzazione
              digitale, offrendo tutorial facili da seguire e interattivi. Il
              sito è progettato per rendere la tecnologia accessibile a tutti,
              guidando gli utenti passo dopo passo in vari argomenti legati al
              mondo digitale. Con contenuti chiari e pratici, Tech4All aiuta le
              persone a sviluppare le competenze necessarie per navigare,
              comprendere e sfruttare le risorse digitali in modo efficace e
              sicuro. Registrati ora per accedere a tutti i contenuti esclusivi
              e inizia il tuo viaggio verso una maggiore competenza digitale!
            </p>

            <button
              onClick={() => setPopupVisible(true)}
              className={styles.cardButton}
            >
              Registrati!
            </button>

            {/* Popup */}
            {isPopupVisible && (
              <div className={styles.popup}>
                <div className={styles.popupContent}>
                  <button className={styles.closeButton} onClick={closePopup}>
                    X
                  </button>
                  <p className={styles.popupText}>Sai già come registrarti?</p>
                  <div className={styles.popupButtons}>
                    <button
                      onClick={() => handleChoice("si")}
                      className={styles.popupButton}
                    >
                      Sì
                    </button>
                    <button
                      onClick={() => handleChoice("no")}
                      className={styles.popupButton}
                    >
                      No
                    </button>
                  </div>
                  {message && <p className={styles.popupMessage}>{message}</p>}
                </div>
              </div>
            )}
          </section>
        </main>
      </AuthProvider>
      <Footer />
    </div>
  );
};

export default App;
