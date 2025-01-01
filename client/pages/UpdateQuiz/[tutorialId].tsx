import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../../src/css/UpdateQuiz.css";

const UpdateQuizPage: React.FC = () => {
  const router = useRouter();
  const { tutorialId } = router.query;
  const [domande, setDomande] = useState([
    { domanda: "", risposte: ["", "", ""], corretta: 0 },
  ]);

  useEffect(() => {
    if (tutorialId) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
      const quiz = quizzes.find(
        (q: any) => q.tutorialId === Number(tutorialId)
      );
      if (quiz) {
        setDomande(quiz.domande);
      }
    }
  }, [tutorialId]);

  const handleChangeDomanda = (index: number, value: string) => {
    setDomande((prev) => {
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
    setDomande((prev) => {
      const updated = [...prev];
      updated[indexDomanda].risposte[indexRisposta] = value;
      return updated;
    });
  };

  const handleChangeCorretta = (
    indexDomanda: number,
    indexCorretta: number
  ) => {
    setDomande((prev) => {
      const updated = [...prev];
      updated[indexDomanda].corretta = indexCorretta;
      return updated;
    });
  };

  const handleAggiungiDomanda = () => {
    setDomande((prev) => [
      ...prev,
      { domanda: "", risposte: ["", "", ""], corretta: 0 },
    ]);
  };

  const handleRimuoviDomanda = () => {
    setDomande((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    const quizData = {
      tutorialId: Number(tutorialId),
      domande: domande,
    };

    // Aggiorna i dati del quiz nel localStorage
    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const updatedQuizzes = existingQuizzes.map((quiz: any) =>
      quiz.tutorialId === Number(tutorialId) ? quizData : quiz
    );
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

    router.push(`/Contenuto/${tutorialId}`);
  };

  const isFormValid = () => {
    return domande.every(
      (domanda) =>
        domanda.domanda.trim() !== "" &&
        domanda.risposte.every((risposta) => risposta.trim() !== "")
    );
  };

  return (
    <div className="update-quiz-container">
      <h2 className="update-quiz-titolo">Aggiorna quiz</h2>
      {domande.map((domanda, index) => (
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
          disabled={domande.length === 1}
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

export default UpdateQuizPage;
