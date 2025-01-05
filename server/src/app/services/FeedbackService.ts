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
      //lunghezza recensione tra 2 e 500 caratteri
      if (commento.length < 2 || commento.length > 500) {
        return {
          success: false,
          message: "Lunghezza recensione tra 2 e 500 caratteri.",
        };
      }
      //valutazione tra 1 e 5
      if (valutazione < 1 || valutazione > 5) {
        return {
          success: false,
          message: "Valutazione tra 1 e 5.",
        };
      }
      const existingFeedback =
        await this.FeedbackDao.getFeedbackByUserIdAndTutorialId(
          userId,
          tutorialId,
        );
      if (existingFeedback) {
        return {
          success: false,
          message: "Feedback già inserito per questo tutorial.",
        };
      }
      const feedback = new Feedback(valutazione, commento, userId, tutorialId);
      await this.FeedbackDao.createFeedback(feedback);
      return {
        success: true,
        feedback: feedback,
        message: "Feedback creato con successo.",
      };
    } catch (error) {
      console.error("Errore durante l'aggiunta del feedback:", error);
      return {
        success: false,
        message: "Errore durante l'aggiunta del feedback.",
      };
    }
  }

  async EliminaFeedback(
    utenteId: number | undefined,
    TutorialId: number | undefined,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      if (!utenteId || !TutorialId) {
        return {
          success: false,
          message: "Feedback obbligatorio.",
        };
      }
      await this.FeedbackDao.deleteFeedback(utenteId, TutorialId);
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
  //Visualizza feedback utente id e tutorial id
  async VisualizzaFeedbackUtenteTutorial(
    userId: number,
    tutorialId: number,
  ): Promise<{
    success: boolean;
    feedback?: Feedback;
    message?: string;
  }> {
    try {
      if (!userId || !tutorialId) {
        return {
          success: false,
          message: "ID utente e ID tutorial obbligatori.",
        };
      }
      const feedback = await this.FeedbackDao.getFeedbackByUserIdAndTutorialId(
        userId,
        tutorialId,
      );
      if (!feedback) {
        return {
          success: false,
          message: "Feedback non trovato.",
        };
      }
      return {
        success: true,
        feedback: feedback,
      };
    } catch (error) {
      console.error("Errore durante la visualizzazione del feedback:", error);
      return {
        success: false,
        message: "Errore durante la visualizzazione del feedback.",
      };
    }
  }
}
