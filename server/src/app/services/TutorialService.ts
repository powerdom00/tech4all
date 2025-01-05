import { TutorialDao } from "../dao/TutorialDao";
import { Tutorial } from "../entity/gestione_tutorial/Tutorial";
import { Categoria } from "../entity/gestione_tutorial/Categoria";

export class TutorialService {
  private tutorialDao: TutorialDao;

  constructor() {
    this.tutorialDao = new TutorialDao();
  }

  // Creazione di un nuovo tutorial
  async creazioneTutorial(
    tutorial: Tutorial
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Validazione Titolo
      const titolo = tutorial.getTitolo();
      if (!titolo) {
        return {
          success: false,
          message: "Il titolo del tutorial non può essere vuoto.",
        };
      }
      if (!/^[a-zA-ZÀ-ÿ0-9][a-zA-Zà-ÿ0-9\s-:'-]*$/.test(titolo)) {
        return {
          success: false,
          message: "Il titolo contiene caratteri non validi.",
        };
      }
      if (titolo.length < 1 || titolo.length > 100) {
        return {
          success: false,
          message: "Il titolo deve avere tra gli 1 e i 100 caratteri.",
        };
      }

      // Validazione Testo
      const testo = tutorial.getTesto();
      if (!testo) {
        return {
          success: false,
          message: "Il testo del tutorial non può essere vuoto.",
        };
      }
      if (testo.length < 20 || testo.length > 65535) {
        return {
          success: false,
          message: "Il testo deve avere tra i 20 e i 65.535 caratteri.",
        };
      }

      // Validazione Grafica
      const grafica = tutorial.getGrafica();
      if (!grafica) {
        return {
          success: false,
          message: "La grafica del tutorial non può essere vuota.",
        };
      }
      if (!/\.(png|jpg|jpeg|webp)$/i.test(grafica)) {
        return {
          success: false,
          message:
            "Il formato della foto non è valido. Sono ammessi solo i formati png, jpg, jpeg, webp.",
        };
      }

      // Validazione Categoria
      const categoria = tutorial.getCategoria();
      if (!categoria) {
        return {
          success: false,
          message: "La categoria del tutorial non può essere vuota.",
        };
      }
      const categorieValide = Object.values(Categoria);
      if (!categorieValide.includes(categoria as Categoria)) {
        return {
          success: false,
          message: `La categoria inserita non è valida. Le categorie valide sono: ${categorieValide.join(
            ", "
          )}.`,
        };
      }
      if (categoria.length < 1 || categoria.length > 50) {
        return {
          success: false,
          message:
            "La lunghezza della categoria deve essere tra gli 1 e i 50 caratteri.",
        };
      }

      // Creazione tutorial
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
    id: number
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
    valutazione?: "asc" | "desc"
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
