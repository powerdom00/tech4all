import { TutorialDao } from "../dao/TutorialDao";
import { Tutorial } from "../entity/gestione_tutorial/Tutorial";

export class TutorialService {
  private tutorialDao: TutorialDao;

  constructor() {
    this.tutorialDao = new TutorialDao();
  }

  // Creazione di un nuovo tutorial
  async creazioneTutorial(
    tutorial: Tutorial,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.tutorialDao.createTutorial(tutorial);
      return {
        success: true,
        message: "Tutorial creato con successo.",
      };
    } catch (error) {
      console.error("Errore durante la creazione del tutorial:", error);
      return {
        success: false,
        message: "Errore interno del server. Riprova più tardi.",
      };
    }
  }

  // Eliminazione di un tutorial
  async cancellazioneTutorial(
    id: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.tutorialDao.deleteTutorial(id);
      return {
        success: true,
        message: "Tutorial eliminato con successo.",
      };
    } catch (error) {
      console.error("Errore durante l'eliminazione del tutorial:", error);
      return {
        success: false,
        message: "Errore interno del server. Riprova più tardi.",
      };
    }
  }

  // Visualizzazione della lista di tutti i tutorial
  async visualizzazioneListaTutorial(): Promise<Tutorial[]> {
    try {
      return await this.tutorialDao.getAllTutorials();
    } catch (error) {
      console.error("Errore durante la visualizzazione dei tutorial:", error);
      throw new Error("Errore interno del server.");
    }
  }

  // Visualizzazione di un tutorial specifico
  async visualizzazioneTutorial(id: number): Promise<Tutorial | null> {
    try {
      return await this.tutorialDao.getTutorialById(id);
    } catch (error) {
      console.error("Errore durante la visualizzazione del tutorial:", error);
      throw new Error("Errore interno del server.");
    }
  }

  // Filtro tutorial per categoria o valutazione
  async filtroTutorial(
    categoria?: string,
    valutazione?: "asc" | "desc",
  ): Promise<Tutorial[]> {
    try {
      if (categoria) {
        // Filtra direttamente dal database per categoria
        return await this.tutorialDao.getTutorialsByCategoria(categoria);
      } else if (valutazione) {
        // Ordina direttamente dal database per valutazione
        return await this.tutorialDao.getTutorialsByValutazione(valutazione);
      }

      // Se nessun parametro è fornito, restituisce tutti i tutorial
      return await this.tutorialDao.getAllTutorials();
    } catch (error) {
      console.error("Errore durante il filtraggio dei tutorial:", error);
      throw new Error("Errore interno del server.");
    }
  }
  // Metodo per la ricerca di tutorial basata su una parola chiave
  async ricercaTutorial(parolaChiave: string): Promise<Tutorial[]> {
    try {
      return await this.tutorialDao.searchTutorials(parolaChiave);
    } catch (error) {
      console.error("Errore durante la ricerca dei tutorial:", error);
      throw new Error("Errore interno del server.");
    }
  }
}
