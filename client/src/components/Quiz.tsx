import React, { useState, useEffect } from "react";
import "../css/Quiz.css";
import axios from "axios";
import { useAuth } from "../../pages/context/AuthContext";
import { Domanda, Risposta } from "@/interfacce/Quiz";
import ApiControllerFacade from "@/controller/ApiControllerFacade";
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
      {risposteCorrette === 1 ? "domanda" : "domande"}.
    </p>
  ) : null;
};

const QuizComponent: React.FC<{ tutorialId: number }> = ({ tutorialId }) => {
  const { user } = useAuth();
  const utenteId = user?.id;
  const [risposteSelezionate, setRisposteSelezionate] = useState<{
    [key: number]: number;
  }>({});
  const [risultato, setRisultato] = useState<string | null>(null);
  const [bloccato, setBloccato] = useState<boolean>(false);
  const [evidenzia, setEvidenzia] = useState<boolean>(false);
  const [domandeQuiz, setDomandeQuiz] = useState<Domanda[]>([]);
  const [risposteQuiz, setRisposteQuiz] = useState<Risposta[]>([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const { domande, risposte } =
          await ApiControllerFacade.getQuizByTutorialId(tutorialId);
        setDomandeQuiz(domande);
        setRisposteQuiz(risposte);
      } catch (error) {
        console.error("Errore nel recupero dei dati del quiz:", error);
      }
    };

    fetchQuizData();
  }, [tutorialId]);

  const tutteRisposteDate = () => {
    return domandeQuiz.every((domanda) =>
      Object.keys(risposteSelezionate).includes(domanda.id.toString()),
    );
  };

  const handleCambioRisposta = (
    domandaId: number,
    rispostaId: number,
  ): void => {
    if (!bloccato) {
      setRisposteSelezionate((prev) => ({
        ...prev,
        [domandaId]: rispostaId,
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    let risposteCorrette = 0;

    domandeQuiz.forEach((domanda: Domanda) => {
      const rispostaSelezionataId = risposteSelezionate[domanda.id];
      const rispostaCorretta = risposteQuiz.find(
        (risposta: Risposta) =>
          risposta.domanda_id === domanda.id && risposta.corretta,
      );

      if (rispostaCorretta && rispostaCorretta.id === rispostaSelezionataId) {
        risposteCorrette++;
      }
    });

    const percentualeCorrette = (risposteCorrette / domandeQuiz.length) * 100;
    setRisultato(percentualeCorrette > 70 ? "superato" : "non superato");
    setBloccato(true);
    setEvidenzia(true);

    const risposteUtente = Object.values(risposteSelezionate);
    const quizId = domandeQuiz[0]?.quiz_id;

    if (quizId && utenteId) {
      try {
        const { success, message } = await ApiControllerFacade.executeQuiz(
          quizId,
          risposteUtente,
          utenteId,
        );

        if (success) {
          console.log("Risultato del quiz inviato con successo");
        } else {
          console.error("Errore nell'invio del risultato del quiz:", message);
        }
      } catch (error) {
        console.error(
          "Errore del server nell'invio del risultato del quiz:",
          error,
        );
      }
    }
  };

  const risposteCorrette = Object.values(risposteSelezionate).filter(
    (rispostaId) => {
      const risposta = risposteQuiz.find((r: Risposta) => r.id === rispostaId);
      return risposta && risposta.corretta;
    },
  ).length;

  const minRisposteCorrette = Math.ceil(domandeQuiz.length * 0.7);

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
            (risposta) => risposta.domanda_id === domanda.id,
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
          disabled={bloccato || !tutteRisposteDate()}
        >
          Conferma
        </button>
        {!tutteRisposteDate() && (
          <p className="error-message">
            Rispondi a tutte le domande prima di confermare.
          </p>
        )}
      </div>
      <RisultatoComponent
        risultato={risultato}
        risposteCorrette={risposteCorrette}
      />
    </div>
  );
};

export default QuizComponent;
