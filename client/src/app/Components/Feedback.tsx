import React, { useEffect, useState } from "react";
import { Feedback } from "@/interfacce/Feedback";
import { useAuth } from "../../../pages/context/AuthContext";

type Props = {
  id: string; // tutorialId passato dalla pagina specifica del tutorial
};

const FeedbackComponent = ({ id }: Props) => {
  const [feedback, setFeedback] = useState<Feedback[] | null>(null);
  const { user } = useAuth(); // Ottieni i dati dell'utente autenticato dal contesto

  useEffect(() => {
    console.log("Stato dell'utente nel contesto:", user);
  }, [user]);

  // Estrai fetchFeedback come funzione riutilizzabile
  const fetchFeedback = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/feedback/visualizzaFeedback/${id}`
      );
      const result = await response.json();
      console.log("Risultato feedback:", result);
      if (result.success) {
        setFeedback(result.Feedback); // Salva i feedback nel state
      } else {
        console.error("Feedback non trovato");
      }
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

    const valutazione = prompt("Inserisci la tua valutazione (1-5):");
    const commento = prompt("Inserisci il tuo commento:");

    if (!valutazione || !commento) {
      alert("Valutazione e commento sono obbligatori!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/feedback/creaFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valutazione: parseInt(valutazione, 10),
          commento,
          utenteId,
          tutorialId: id,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Feedback creato con successo!");
        fetchFeedback(); // Aggiorna i feedback dopo la creazione
      } else {
        alert(`Errore: ${result.message}`);
      }
    } catch (error) {
      console.error("Errore durante la creazione del feedback", error);
      alert("Errore del server");
    }
  };
const handleDeleteFeedback = async (utenteId: number, tutorialId: string) => {
  try {
    // Costruisci l'URL usando utenteId e tutorialId
    const response = await fetch(`http://localhost:5000/feedback/eliminaFeedback/${utenteId}/${tutorialId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Feedback eliminato con successo!");

      // Aggiorna lo stato per rimuovere il feedback dalla lista
      setFeedback((prev) =>
        prev ? prev.filter((item) => item.utenteId !== utenteId || item.tutorialId !== parseInt(tutorialId, 10)) : null
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
  if (valutazione <= 2) return "border-red";
  if (valutazione === 3) return "border-yellow";
  if (valutazione >= 4) return "border-green";
  return "";
};

  return (
    <>
      <div className="feedback-container">
        {feedback.map((item, index) => (
          <div key={`${item.utenteId}-${index}`} className={`feedback-item ${getBorderClass(item.valutazione)}`}>
            <p>Valutazione: {item.valutazione || "Non disponibile"}</p>
            <p>Commento: {item.commento || "Non disponibile"}</p>
            <p>ID Utente: {item.utenteId ?? "Anonimo"}</p>
            {/* Mostra il bottone elimina solo se l'utente è il creatore */}
            {user?.id === item.utenteId && (
              <button
                className="delete-feedback-btn"
                onClick={() => handleDeleteFeedback(item.utenteId, item.tutorialId.toString())}
              >
                Elimina Feedback
              </button>
            )}
          </div>
        ))}
      </div>
      <br />
      <button className="create-feedback-btn" onClick={handleCreateFeedback}>
        Crea Nuovo Feedback
      </button>
    </>
);
};

export default FeedbackComponent;
