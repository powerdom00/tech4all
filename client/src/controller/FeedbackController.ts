import { Feedback } from "@/interfacce/Feedback";
import axios from "axios";

export class FeedbackController {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/feedback`;
  }

  // Metodo per creare un nuovo feedback
  async createFeedback(
    valutazione: number,
    commento: string,
    utenteId: number,
    tutorialId: number
  ): Promise<void> {
    try {
      const response = await axios.post(`${this.baseUrl}/creaFeedback`, {
        valutazione,
        commento,
        utenteId,
        tutorialId,
      });
      if (response.status !== 201) {
        throw new Error(
          response.data.message || "Errore nella creazione del feedback"
        );
      }
    } catch (error) {
      console.error("Errore durante la creazione del feedback:", error);
      throw error;
    }
  }

  // Metodo per eliminare un feedback
  async deleteFeedback(
    utenteId: number,
    tutorialId: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/eliminaFeedback/${utenteId}/${tutorialId}`
      );
      if (response.status === 200) {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, message: error.response.data.message };
      } else {
        console.error("Errore durante l'eliminazione del feedback:", error);
        throw error;
      }
    }
  }

  // Metodo per visualizzare i feedback di un tutorial
  async getFeedbackByTutorialId(tutorialId: number): Promise<Feedback[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/visualizzaFeedback/${tutorialId}`
      );
      return response.data.Feedback;
    } catch (error) {
      console.error("Errore durante il recupero dei feedback:", error);
      throw error;
    }
  }

  // Metodo per visualizzare i feedback di un utente
  async getFeedbackByUserId(utenteId: number): Promise<Feedback[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/visualizzaFeedbackUtente/${utenteId}`
      );
      return response.data.Feedback;
    } catch (error) {
      console.error("Errore durante il recupero dei feedback:", error);
      throw error;
    }
  }
}
