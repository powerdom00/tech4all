"use client"; // Indica che questo componente è client-side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./page.css"; // Aggiungi qui il tuo CSS

const App: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      if ((window as any).voiceflow?.chat) {
        (window as any).voiceflow.chat.load({
          verify: { projectID: "6751625fc71e01f74bc3188e" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      } else {
        console.error("Voiceflow non è stato caricato correttamente.");
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChoice = (choice: string) => {
    if (choice === "si") {
      router.push("/register"); // Redirect alla pagina di registrazione
    } else if (choice === "no") {
      setMessage(
        "Per imparare a registrarti, guarda il video tutorial che trovi al centro della pagina.",
      );
    }
  };

  const closePopup = () => {
    setPopupVisible(false); // Funzione per chiudere il popup
  };

  return (
    <div className="container">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Tech4All</h1>
            <p className="hero-subtitle">
              Impara a usare la tecnologia in modo facile e divertente!
            </p>
          </div>
        </section>

        <section className="card">
          <div className="video-container">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/7yWTIPHhwaI"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <h2 className="card-title">Chi siamo?</h2>
          <p className="card-text">
            Tech4All è un sito dedicato a migliorare l'alfabetizzazione
            digitale, offrendo tutorial facili da seguire e interattivi. Il sito
            è progettato per rendere la tecnologia accessibile a tutti, guidando
            gli utenti passo dopo passo in vari argomenti legati al mondo
            digitale. Con contenuti chiari e pratici, Tech4All aiuta le persone
            a sviluppare le competenze necessarie per navigare, comprendere e
            sfruttare le risorse digitali in modo efficace e sicuro. Registrati
            ora per accedere a tutti i contenuti esclusivi e inizia il tuo
            viaggio verso una maggiore competenza digitale!
          </p>

          <button onClick={() => setPopupVisible(true)} className="card-button">
            Registrati!
          </button>

          {/* Popup */}
          {isPopupVisible && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-button" onClick={closePopup}>
                  X
                </button>
                <p className="popup-text">Sai già come registrarti?</p>
                <div className="popup-buttons">
                  <button
                    onClick={() => handleChoice("si")}
                    className="popup-button"
                  >
                    Sì
                  </button>
                  <button
                    onClick={() => handleChoice("no")}
                    className="popup-button"
                  >
                    No
                  </button>
                </div>
                {message && <p className="popup-message">{message}</p>}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
