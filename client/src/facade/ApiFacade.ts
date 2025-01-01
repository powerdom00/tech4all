// tech4all/client/src/ApiFacade.ts
import axios from "axios";
import { Tutorial } from "../interfacce/Tutorial";
import { Quiz, Domanda, Risposta } from "../interfacce/Quiz";
import { Feedback } from "@/interfacce/Feedback";

class ApiFacade {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Metodo per ottenere i tutorial
  async getTutorials(): Promise<Tutorial[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/tutorials/tutorial`);
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero dei tutorial:", error);
      throw error;
    }
  }

  // Metodo per ottenere un tutorial specifico
  async getTutorialById(id: number): Promise<Tutorial> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/tutorials/tutorial/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero del tutorial:", error);
      throw error;
    }
  }

  // Metodo per creare un nuovo tutorial
  async createTutorial(formData: FormData): Promise<void> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/tutorials/tutorial`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Errore durante la creazione del tutorial:", error);
      throw error;
    }
  }

  // Metodo per eliminare un tutorial
  async deleteTutorial(id: number): Promise<void> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/tutorials/tutorial/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Errore durante l'eliminazione del tutorial:", error);
      throw error;
    }
  }

  // Metodo per controllare se un quiz esiste per un dato tutorial ID
  async checkQuizExists(
    tutorialId: number
  ): Promise<{ exists: boolean; quizId: number | null }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/quiz/visualizzaQuiz/${tutorialId}`
      );
      const exists =
        response.status === 200 && response.data.domande.length > 0;
      const quizId = exists ? response.data.id : null;
      return { exists, quizId };
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        return { exists: false, quizId: null };
      } else {
        console.error("Errore nel controllo dell'esistenza del quiz:", error);
        throw error;
      }
    }
  }

  // Metodo per ottenere un quiz specifico per tutorial ID
  async getQuizByTutorialId(
    tutorialId: number
  ): Promise<{ domande: Domanda[]; risposte: Risposta[] }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/quiz/visualizzaQuiz/${tutorialId}`
      );
      const quiz = response.data;

      const domande = quiz.domande.map((d: any) => ({
        id: d.id,
        quiz_id: d.quizId,
        domanda: d.domanda,
      }));

      const risposte = quiz.domande.flatMap((d: any) =>
        d.risposte.map((r: any) => ({
          id: r.id,
          domanda_id: r.domandaId,
          risposta: r.risposta,
          corretta: r.corretta,
        }))
      );

      return { domande, risposte };
    } catch (error) {
      console.error("Errore durante il recupero del quiz:", error);
      throw error;
    }
  }

  // Metodo per creare un nuovo quiz
  async createQuiz(
    tutorialId: number,
    nuoveDomande: { domanda: string; risposte: string[]; corretta: number }[]
  ): Promise<void> {
    const quizData = {
      tutorialId,
      domande: nuoveDomande.map((domanda) => ({
        domanda: domanda.domanda,
        risposte: domanda.risposte.map((risposta, index) => ({
          risposta,
          corretta: index === domanda.corretta,
        })),
      })),
    };

    try {
      const response = await axios.post(`${this.baseUrl}/quiz/creaQuiz`, {
        quiz: quizData,
      });
      if (response.status !== 201) {
        throw new Error(
          response.data.message || "Errore nella creazione del quiz"
        );
      }
    } catch (error) {
      console.error("Errore durante la creazione del quiz:", error);
      throw error;
    }
  }

  // Metodo per eliminare un quiz
  async deleteQuiz(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/quiz/eliminaQuiz/${id}`
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
        console.error("Errore durante l'eliminazione del quiz:", error);
        throw error;
      }
    }
  }

  // Metodo per eseguire un quiz
  async executeQuiz(
    quizId: number,
    risposteUtente: number[],
    utenteId: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await axios.post(`${this.baseUrl}/quiz/eseguiQuiz`, {
        quizId,
        risposteUtente,
        utenteId,
      });
      if (response.status === 200) {
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { success: false, message: error.response.data.message };
      } else {
        console.error("Errore durante l'esecuzione del quiz:", error);
        throw error;
      }
    }
  }

  // Metodo per creare un nuovo feedback
  async createFeedback(
    valutazione: number,
    commento: string,
    utenteId: number,
    tutorialId: number
  ): Promise<void> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/feedback/creaFeedback`,
        {
          valutazione,
          commento,
          utenteId,
          tutorialId,
        }
      );
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
        `${this.baseUrl}/feedback/eliminaFeedback/${utenteId}/${tutorialId}`
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
        `${this.baseUrl}/feedback/visualizzaFeedback/${tutorialId}`
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
        `${this.baseUrl}/feedback/visualizzaFeedbackUtente/${utenteId}`
      );
      return response.data.Feedback;
    } catch (error) {
      console.error("Errore durante il recupero dei feedback:", error);
      throw error;
    }
  }
}

export default new ApiFacade("http://localhost:5000");
