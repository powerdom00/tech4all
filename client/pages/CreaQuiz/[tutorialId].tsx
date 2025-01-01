import React, { useState } from "react";
import { useRouter } from "next/router";
import "../../src/css/CreaQuiz.css";
import axios from "axios";
import ApiFacade from "@/facade/ApiFacade";

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
      try {
        await ApiFacade.createQuiz(Number(tutorialId), nuoveDomande);
        router.push(`/Contenuto/${tutorialId}`);
      } catch (error) {
        console.error("Errore nella creazione del quiz:", error);
      }
    }
  };

  const isFormValid = () => {
    return nuoveDomande.every(
      (domanda) =>
        domanda.domanda.trim() !== "" &&
        domanda.risposte.every((risposta) => risposta.trim() !== "")
    );
  };

  return (
    <div className="crea-quiz-container">
      <h2 className="crea-quiz-titolo">Crea un nuovo quiz</h2>
      {nuoveDomande.map((domanda, index) => (
        <div key={index} className="domanda-container">
          <input
            type="text"
            placeholder="Inserisci la domanda"
            value={domanda.domanda}
            onChange={(e) => handleChangeDomanda(index, e.target.value)}
            className="domanda-input"
          />
          {domanda.risposte.map((risposta, i) => (
            <div key={i} className="risposta-container">
              <input
                type="text"
                placeholder={`Risposta ${i + 1}`}
                value={risposta}
                onChange={(e) => handleChangeRisposta(index, i, e.target.value)}
                className="risposta-input"
              />
              <button
                type="button"
                onClick={() => handleChangeCorretta(index, i)}
                className={`corretta-button ${
                  domanda.corretta === i ? "selezionata" : ""
                }`}
              >
                {domanda.corretta === i ? "Corretta" : "Seleziona"}
              </button>
            </div>
          ))}
        </div>
      ))}
      <div className="button-container">
        <button onClick={handleAggiungiDomanda} className="aggiungi-button">
          Aggiungi domanda
        </button>
        <button
          onClick={handleRimuoviDomanda}
          disabled={nuoveDomande.length === 1}
          className="rimuovi-button"
        >
          Rimuovi domanda
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="salva-button"
        >
          Salva quiz
        </button>
      </div>
    </div>
  );
};

export default CreaQuizPage;
