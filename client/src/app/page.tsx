"use client";

import React, { useState } from 'react';
import Header from "./Components/Header";
import Footer from './Components/Footer';
import './page.css';

/* 

  Accortezze:se dovete inserire un immagine inseritela nella cartella media che non può essere spostata da public
  poiché next.js richiede che le immagine statiche siano postate li. Per quanto possibile manterene la stessa palette cromatica.
  Ho inserito il comando "use client" cosi node non da problemi con useState ed ho creato un prima bozza della pagina iniziale.
  Se vi servono chiarimenti ci sono; by Casotto.

*/

const App: React.FC = () => {

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleChoice = () => {
    setPopupVisible(false); // Chiusura popup
  };


  return (
    <div>
      <Header />  {/* Aggiunta component header*/}
      <main>
      <section className="hero">
        <div className="hero-content">
          <h1>Tech4All</h1>
        </div>
      </section>
        <div className="card">
          <h2>Chi siamo?</h2>

          <p>
            Tech4All è un sito dedicato a migliorare l alfabetizzazione digitale, 
            offrendo tutorial facili da seguire e interattivi. 
            Il sito è progettato per rendere la tecnologia accessibile a tutti, 
            guidando gli utenti passo dopo passo in vari argomenti legati al mondo digitale. 
            Con contenuti chiari e pratici, Tech4All aiuta le persone a sviluppare le competenze necessarie per navigare, 
            comprendere e sfruttare le risorse digitali in modo efficace e sicuro.
            Registrati ora per accedere a tutti i contenuti esclusivi e inizia il tuo viaggio verso una maggiore competenza digitale!
          </p>

          <button onClick={() => setPopupVisible(true)} className="card-button">
            Registrati!
          </button>
          
          {/* Creazione popoup*/}
          {isPopupVisible && (      
            <div className="popup">
              <div className="popup-content">
                  <p>Sai già come registrarti?</p>
              <div className="popup-buttons">
                <button onClick={handleChoice} className="popup-button">
                  Sì
                </button>
                <button onClick={handleChoice} className="popup-button">
                  No
                </button>
              </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />  {/* Aggiunta component footer*/}
    </div>
  );
}

export default App;