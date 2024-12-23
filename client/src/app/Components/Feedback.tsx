import React, { useEffect, useState } from "react";
import { Feedback } from "@/interfacce/Feedback";
type Props = {
    id: string;
};

  const FeedbackComponent = ({ id }: Props) => {
    const [feedback, setFeedback] = useState<Feedback[] | null>(null);
  
    useEffect(() => {
      const fetchFeedback = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/feedback/visualizzaFeedback/${id}`
                                      );
    const result = await response.json(); // Leggi il corpo della risposta in un'unica variabile
    if (result.success) {
      const data: Feedback[] = result.Feedback; 
      setFeedback(data);
    } else {
      console.error("Feedback not found");
    }
  } catch (error) {
    console.error("Error fetching feedback", error);
  }
};
      fetchFeedback();
    }, [id]);
  
    if (!feedback) {
      return <div>Loading tutorial...</div>;
    }
 
      return (
        <><div className="feedback-container">
              {feedback.map((item) => (
                  <div key={item.commento} className="feedback-item">
                      <p>Valutazione: {item.valutazione}</p>
                      <p>Commento: {item.commento}</p>
                      <p>ID Utente: {item.utenteId}</p>
                  </div>
              ))}
          </div>
              <br></br>
              <button className="create-feedback-btn" onClick={() => console.log("Crea Nuovo Feedback")}>
                  Crea Nuovo Feedback
              </button></>
  );
};

export default FeedbackComponent;