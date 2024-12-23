//import entità e dao
import { Feedback } from "../entity/gestione_feedback/Feedback";
import { FeedbackDao } from "../dao/FeedbackDao";

export class FeedbackService {
  private FeedbackDao: FeedbackDao;

  constructor() {
    this.FeedbackDao = new FeedbackDao();
  }

  /**
   * Metodo per visualizzare i dati feedback.
   * @param userId- ID dell'utente.
   * @param tutorialId - ID del tutorial.
   * @returns Una promessa che risolve un oggetto con i dati del feedback o un messaggio di errore.
   */

  async VisualizzaFeedbackUtente(userId: number): Promise<{
    success: boolean;
    Feedback?: Feedback[];
    message?: string;
  }> {
    try {
      if (!userId) {
        return {
          success: false,
          message: "ID utente obbligatorio.",
        };
      }
      const feedback = await this.FeedbackDao.getFeedbackByUserId(userId);
      if (!feedback) {
        return {
          success: false,
          message: "Feedback non trovato.",
        };
      }
      return {
        success: true,
        Feedback: feedback,
      };
    } catch (error) {
      console.error("Errore durante la visualizzazione del feedback:", error);
      return {
        success: false,
        message: "Errore durante la visualizzazione del feedback.",
      };
    }
  }
  async VisualizzaFeedbackTutorial(tutorialId: number): Promise<{
    success: boolean;
    Feedback?: Feedback[];
    message?: string;
  }> {
    try {
      if (!tutorialId) {
        return {
          success: false,
          message: "ID tutorial obbligatorio.",
        };
      }
      const feedback =
        await this.FeedbackDao.getFeedbackByTutorialId(tutorialId);
      if (!feedback) {
        return {
          success: false,
          message: "Feedback non trovato.",
        };
      }
      return {
        success: true,
        Feedback: feedback,
      };
    } catch (error) {
      console.error("Errore durante la visualizzazione del feedback:", error);
      return {
        success: false,
        message: "Errore durante la visualizzazione del feedback.",
      };
    }
  }

  /**
   * Metodo per aggiungere un feedback.
   * @param valutazione - Valutazione del tutorial.
   * @param commento - Commento del tutorial.
   * @param userId - ID dell'utente.
   * @param tutorialId - ID del tutorial.
   * @returns Una promessa che risolve un oggetto con i dati del feedback aggiunto o un messaggio di errore.
   */

  async creaFeedback(
    valutazione: number,
    commento: string,
    userId: number,
    tutorialId: number,
  ): Promise<{ success: boolean; feedback?: Feedback; message?: string }> {
    try {
      if (!valutazione || !commento || !userId || !tutorialId) {
        return {
          success: false,
          message:
            "Valutazione, commento, ID utente e ID tutorial obbligatori.",
        };
      }
      const feedback = new Feedback(valutazione, commento, userId, tutorialId);
      await this.FeedbackDao.createFeedback(feedback);
      return {
        success: true,
        feedback: feedback,
      };
    } catch (error) {
      console.error("Errore durante l'aggiunta del feedback:", error);
      return {
        success: false,
        message: "Errore durante l'aggiunta del feedback.",
      };
    }
  }

  /**
   * Metodo per aggiornare un feedback.
   * @param valutazione - Valutazione del tutorial.
   * @param commento - Commento del tutorial.
   * @param userId - ID dell'utente.
   * @param tutorialId - ID del tutorial.
   * @returns Una promessa che risolve un oggetto con il feedback aggiornato o un messaggio di errore.
   */

  async AggiornaFeedback(
    valutazione: number,
    commento: string,
    userId: number,
    tutorialId: number,
  ): Promise<{ success: boolean; feedback?: Feedback; message?: string }> {
    try {
      if (!valutazione || !commento || !userId || !tutorialId) {
        return {
          success: false,
          message:
            "Valutazione, commento, ID utente e ID tutorial obbligatori.",
        };
      }
      const feedback = new Feedback(valutazione, commento, userId, tutorialId);
      await this.FeedbackDao.updateFeedback(feedback);
      return {
        success: true,
        feedback: feedback,
      };
    } catch (error) {
      console.error("Errore durante l'aggiornamento del feedback:", error);
      return {
        success: false,
        message: "Errore durante l'aggiornamento del feedback.",
      };
    }
  }

  async EliminaFeedback(
    feedback: Feedback,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      if (!feedback) {
        return {
          success: false,
          message: "Feedback obbligatorio.",
        };
      }
      await this.FeedbackDao.deleteFeedback(
        feedback.getUtenteId(),
        feedback.getTutorialId(),
      );
      return {
        success: true,
      };
    } catch (error) {
      console.error("Errore durante l'eliminazione del feedback:", error);
      return {
        success: false,
        message: "Errore durante l'eliminazione del feedback.",
      };
    }
  }
}
