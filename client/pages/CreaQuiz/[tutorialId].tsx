import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../src/css/CreaQuiz.module.css";
import axios from "axios";
import ApiControllerFacade from "@/controller/ApiControllerFacade";

const CreaQuizPage: React.FC = () => {
  const router = useRouter();
  const { tutorialId } = router.query;
  const [nuoveDomande, setNuoveDomande] = useState([
    { domanda: "", risposte: ["", "", ""], corretta: 0 },
  ]);

  const handleChangeDomanda = (index: number, value: string) => {
    setNuoveDomande((prev) => {
      const updated = [...prev];
      updated[index].domanda = value;
      return updated;
    });
  };

  const handleChangeRisposta = (
    indexDomanda: number,
    indexRisposta: number,
    value: string
  ) => {
    setNuoveDomande((prev) => {
      const updated = [...prev];
      updated[indexDomanda].risposte[indexRisposta] = value;
      return updated;
    });
  };

  const handleChangeCorretta = (
    indexDomanda: number,
    indexCorretta: number
  ) => {
    setNuoveDomande((prev) => {
      const updated = [...prev];
      updated[indexDomanda].corretta = indexCorretta;
      return updated;
    });
  };

  const handleAggiungiDomanda = () => {
    setNuoveDomande((prev) => [
      ...prev,
      { domanda: "", risposte: ["", "", ""], corretta: 0 },
    ]);
  };

  const handleRimuoviDomanda = () => {
    setNuoveDomande((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const handleSubmit = async () => {
    if (tutorialId) {
      if (!isFormValid()) {
        alert("Lunghezza domanda/risposta sbagliata");
        return;
      }
      try {
        await ApiControllerFacade.createQuiz(Number(tutorialId), nuoveDomande);
        router.push(`/Contenuto/${tutorialId}`);
      } catch (error) {
        console.error("Errore nella creazione del quiz:", error);
      }
    }
  };

  const isFormValid = () => {
    return nuoveDomande.every((domanda) => {
      const isDomandaValid =
        domanda.domanda.trim().length >= 2 &&
        domanda.domanda.trim().length <= 255;

      const areRisposteValid = domanda.risposte.every((risposta) => {
        const len = risposta.trim().length;
        return len >= 2 && len <= 255;
      });

      return isDomandaValid && areRisposteValid;
    });
  };

  return (
    <div className={styles.creaQuizContainer}>
      <h2 className={styles.creaQuizTitolo}>Crea un nuovo quiz</h2>
      {nuoveDomande.map((domanda, index) => (
        <div key={index} className={styles.domandaContainer}>
          <input
            type="text"
            placeholder="Inserisci la domanda"
            value={domanda.domanda}
            onChange={(e) => handleChangeDomanda(index, e.target.value)}
            className={styles.domandaInput}
          />
          {domanda.risposte.map((risposta, i) => (
            <div key={i} className={styles.rispostaContainer}>
              <input
                type="text"
                placeholder={`Risposta ${i + 1}`}
                value={risposta}
                onChange={(e) => handleChangeRisposta(index, i, e.target.value)}
                className={styles.rispostaInput}
              />
              <button
                type="button"
                onClick={() => handleChangeCorretta(index, i)}
                className={`${styles.correttaButton} ${
                  domanda.corretta === i ? styles.selezionata : ""
                }`}
              >
                {domanda.corretta === i ? "Corretta" : "Seleziona"}
              </button>
            </div>
          ))}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <button
          onClick={handleAggiungiDomanda}
          className={styles.aggiungiButton}
        >
          Aggiungi domanda
        </button>
        <button
          onClick={handleRimuoviDomanda}
          disabled={nuoveDomande.length === 1}
          className={styles.rimuoviButton}
        >
          Rimuovi domanda
        </button>
        <button onClick={handleSubmit} className={styles.salvaButton}>
          Salva quiz
        </button>
      </div>
    </div>
  );
};

export default CreaQuizPage;
