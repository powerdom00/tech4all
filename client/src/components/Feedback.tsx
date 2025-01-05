import React, { useEffect, useState } from "react";
import { Feedback } from "@/interfacce/Feedback";
import { useAuth } from "../../pages/context/AuthContext";
import styles from "../css/Feedback.module.css";
import ApiControllerFacade from "@/controller/ApiControllerFacade";
type Props = {
  id: string; // tutorialId passato dalla pagina specifica del tutorial
};

const FeedbackComponent = ({ id }: Props) => {
  const [feedback, setFeedback] = useState<Feedback[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per il modal
  const [valutazione, setValutazione] = useState<number | "">(""); // Stato per la valutazione
  const [commento, setCommento] = useState(""); // Stato per il commento

  const { user } = useAuth(); // Ottieni i dati dell'utente autenticato dal contesto

  useEffect(() => {
    console.log("Stato dell'utente nel contesto:", user);
  }, [user]);

  // Funzione per aprire il modal e resettare i valori
  const openModal = () => {
    setValutazione(""); // Resetta la valutazione
    setCommento(""); // Resetta il commento
    setIsModalOpen(true); // Apre il modal
  };

  // Estrai fetchFeedback come funzione riutilizzabile
  const fetchFeedback = async () => {
    try {
      const result = await ApiControllerFacade.getFeedbackByTutorialId(
        parseInt(id, 10)
      );
      console.log("Risultato feedback:", result);
      setFeedback(result);
    } catch (error) {
      console.error("Errore durante il recupero dei feedback", error);
    }
  };

  useEffect(() => {
    fetchFeedback(); // Carica i feedback al montaggio
  }, [id]);

  const handleCreateFeedback = async () => {
    if (!user) {
      alert("Devi essere autenticato per lasciare un feedback.");
      return;
    }
    const utenteId = user.id;

    if (!valutazione || !commento) {
      alert("Valutazione e commento sono obbligatori!");
      return;
    }

    if (commento.length < 2 || commento.length > 500) {
      alert("Il commento deve contenere tra 2 e 500 caratteri.");
      return;
    }

    if (valutazione < 1 || valutazione > 5) {
      alert("La valutazione deve essere compresa tra 1 e 5.");
      return;
    }

    try {
      // Verifica se esiste già un feedback per lo stesso utente e tutorial
      const feedbackList = await ApiControllerFacade.getFeedbackByTutorialId(
        parseInt(id, 10)
      );
      const existingFeedback = feedbackList.find(
        (feedback) => feedback.utenteId === utenteId
      );

      if (existingFeedback) {
        alert("Feedback già esistente per questo tutorial!");
      } else {
        await ApiControllerFacade.createFeedback(
          valutazione as number,
          commento,
          utenteId,
          parseInt(id, 10)
        );

        alert("Feedback creato con successo!");
        setIsModalOpen(false); // Chiudi il modal
        fetchFeedback(); // Aggiorna i feedback dopo la creazione
      }
    } catch (error) {
      console.error("Errore durante la creazione del feedback", error);
      alert("Errore del server");
    }
  };

  const handleDeleteFeedback = async (utenteId: number, tutorialId: string) => {
    try {
      const result = await ApiControllerFacade.deleteFeedback(
        utenteId,
        parseInt(tutorialId, 10)
      );

      if (result.success) {
        alert("Feedback eliminato con successo!");
        setFeedback((prev) =>
          prev
            ? prev.filter(
                (item) =>
                  item.utenteId !== utenteId ||
                  item.tutorialId !== parseInt(tutorialId, 10)
              )
            : null
        );
      } else {
        alert("Errore durante l'eliminazione del feedback");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del feedback", error);
      alert("Errore del server");
    }
  };

  if (!feedback) {
    return <div>Caricamento...</div>;
  }

  const getBorderClass = (valutazione: number) => {
    if (valutazione <= 2) return styles.borderRed;
    if (valutazione === 3) return styles.borderYellow;
    if (valutazione >= 4) return styles.borderGreen;
    return "";
  };

  return (
    <>
      <div className={styles.feedbackContainer}>
        {feedback.map((item, index) => (
          <div
            key={`${item.utenteId}-${index}`}
            className={`${styles.feedbackItem} ${getBorderClass(
              item.valutazione
            )}`}
          >
            <p>Valutazione: {item.valutazione || "Non disponibile"}</p>
            <p>Commento: {item.commento || "Non disponibile"}</p>
            <p>ID Utente: {item.utenteId ?? "Anonimo"}</p>
            {/* Mostra il bottone elimina solo se l'utente è il creatore */}
            {user?.id === item.utenteId && (
              <button
                className={styles.deleteFeedbackBtn}
                onClick={() =>
                  handleDeleteFeedback(
                    item.utenteId,
                    item.tutorialId.toString()
                  )
                }
              >
                Elimina Feedback
              </button>
            )}
          </div>
        ))}
      </div>
      <br />
      <button className={styles.createFeedbackBtn} onClick={openModal}>
        Crea Nuovo Feedback
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Inserisci un nuovo feedback</h2>
            <label>
              Valutazione (1-5):
              <input
                type="number"
                value={valutazione}
                onChange={(e) => setValutazione(parseInt(e.target.value, 10))}
              />
            </label>
            <label>
              Commento:
              <textarea
                value={commento}
                onChange={(e) => setCommento(e.target.value)}
                maxLength={500}
              ></textarea>
            </label>
            <div className={styles.modalButtons}>
              <button onClick={handleCreateFeedback}>Conferma</button>
              <button onClick={() => setIsModalOpen(false)}>Annulla</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackComponent;
