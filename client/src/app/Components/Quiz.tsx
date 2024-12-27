import React, { useState, useEffect } from "react";
import "../css/Quiz.css";

type Domanda = {
  id: number;
  quiz_id: number;
  domanda: string;
};

type Risposta = {
  id: number;
  domanda_id: number;
  risposta: string;
  corretta: boolean;
};

const DomandaComponent: React.FC<{
  domanda: Domanda;
  risposte: Risposta[];
  rispostaSelezionata: number | undefined;
  onChange: (domandaId: number, rispostaId: number) => void;
  disabilitato: boolean;
  evidenzia: boolean;
}> = ({
  domanda,
  risposte,
  rispostaSelezionata,
  onChange,
  disabilitato,
  evidenzia,
}) => {
  return (
    <div className="domanda-container">
      <p className="domanda-testo">{domanda.domanda}</p>
      <div className="risposte-container">
        {risposte.map((risposta) => {
          const isCorrect = risposta.corretta;
          const isSelected = rispostaSelezionata === risposta.id;

          return (
            <button
              key={risposta.id}
              onClick={() => onChange(domanda.id, risposta.id)}
              disabled={disabilitato}
              className={`risposta-button ${
                evidenzia
                  ? isCorrect && isSelected
                    ? "corretta-selezionata"
                    : isSelected
                    ? "errata-selezionata"
                    : "non-selezionata"
                  : isSelected
                  ? "selezionata"
                  : "non-selezionata"
              } ${isSelected ? "selezionata-bold" : ""}`}
            >
              {risposta.risposta}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const RisultatoComponent: React.FC<{
  risultato: string | null;
  risposteCorrette: number;
}> = ({ risultato, risposteCorrette }) => {
  return risultato ? (
    <p className="risultato-testo">
      Quiz {risultato}! Hai risposto correttamente a {risposteCorrette}{" "}
      {risposteCorrette == 1 ? "domanda" : "domande"}.
    </p>
  ) : null;
};

const QuizComponent: React.FC<{ tutorialId: number }> = ({ tutorialId }) => {
  const [risposteSelezionate, setRisposteSelezionate] = useState<{
    [key: number]: number;
  }>({});
  const [risultato, setRisultato] = useState<string | null>(null);
  const [bloccato, setBloccato] = useState<boolean>(false);
  const [evidenzia, setEvidenzia] = useState<boolean>(false);
  const [domandeQuiz, setDomandeQuiz] = useState<Domanda[]>([]);
  const [risposteQuiz, setRisposteQuiz] = useState<Risposta[]>([]);

  useEffect(() => {
    // Recupera i dati del quiz dal localStorage
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const quiz = quizzes.find((q: any) => q.tutorialId === tutorialId);

    if (quiz) {
      const domande = quiz.domande.map((d: any, index: number) => ({
        id: index + 1,
        quiz_id: tutorialId,
        domanda: d.domanda,
      }));

      const risposte = quiz.domande.flatMap((d: any, indexDomanda: number) =>
        d.risposte.map((r: string, indexRisposta: number) => ({
          id: indexDomanda * 3 + indexRisposta + 1,
          domanda_id: indexDomanda + 1,
          risposta: r,
          corretta: indexRisposta === d.corretta,
        }))
      );

      setDomandeQuiz(domande);
      setRisposteQuiz(risposte);
    }
  }, [tutorialId]);

  const handleCambioRisposta = (
    domandaId: number,
    rispostaId: number
  ): void => {
    if (!bloccato) {
      setRisposteSelezionate((prev) => ({
        ...prev,
        [domandaId]: rispostaId,
      }));
    }
  };

  const handleSubmit = (): void => {
    let risposteCorrette = 0;

    domandeQuiz.forEach((domanda: Domanda) => {
      const rispostaSelezionataId = risposteSelezionate[domanda.id];
      const rispostaCorretta = risposteQuiz.find(
        (risposta: Risposta) =>
          risposta.domanda_id === domanda.id && risposta.corretta
      );

      if (rispostaCorretta && rispostaCorretta.id === rispostaSelezionataId) {
        risposteCorrette++;
      }
    });

    const percentualeCorrette = (risposteCorrette / domandeQuiz.length) * 100;
    setRisultato(percentualeCorrette > 50 ? "superato" : "non superato");
    setBloccato(true);
    setEvidenzia(true);
  };

  const risposteCorrette = Object.values(risposteSelezionate).filter(
    (rispostaId) => {
      const risposta = risposteQuiz.find((r: Risposta) => r.id === rispostaId);
      return risposta && risposta.corretta;
    }
  ).length;

  const minRisposteCorrette = Math.ceil(domandeQuiz.length * 0.5);

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      <p className="quiz-descrizione">
        Per superare il quiz, devi rispondere correttamente ad almeno{" "}
        {minRisposteCorrette}{" "}
        {minRisposteCorrette === 1 ? "domanda" : "domande"}.
      </p>
      {domandeQuiz.map((domanda) => (
        <DomandaComponent
          key={domanda.id}
          domanda={domanda}
          risposte={risposteQuiz.filter(
            (risposta) => risposta.domanda_id === domanda.id
          )}
          rispostaSelezionata={risposteSelezionate[domanda.id]}
          onChange={handleCambioRisposta}
          disabilitato={bloccato}
          evidenzia={evidenzia}
        />
      ))}
      <div className="button-container">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={bloccato}
        >
          Conferma
        </button>
      </div>
      <RisultatoComponent
        risultato={risultato}
        risposteCorrette={risposteCorrette}
      />
    </div>
  );
};

export default QuizComponent;
