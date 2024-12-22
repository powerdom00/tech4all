import express from "express";
import { TutorialService } from "../services/TutorialService";
import { Tutorial } from "../entity/gestione_tutorial/Tutorial";

const router = express.Router();
const tutorialService = new TutorialService();

// Creazione di un nuovo tutorial
router.post("/tutorial", async (req, res) => {
  const { titolo, grafica, testo, categoria, valutazione } = req.body;
  try {
    const nuovoTutorial = new Tutorial(
      titolo,
      grafica,
      testo,
      categoria,
      valutazione,
    );
    const result = await tutorialService.creazioneTutorial(nuovoTutorial);
    res.status(201).json(result);
  } catch (error) {
    console.error("Errore durante la creazione del tutorial:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Eliminazione di un tutorial
router.delete("/tutorial/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tutorialService.cancellazioneTutorial(parseInt(id));
    res.status(200).json(result);
  } catch (error) {
    console.error("Errore durante l'eliminazione del tutorial:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Visualizzazione della lista di tutti i tutorial
router.get("/tutorial", async (req, res) => {
  try {
    const tutorials = await tutorialService.visualizzazioneListaTutorial();
    res.status(200).json(tutorials);
  } catch (error) {
    console.error("Errore durante la visualizzazione dei tutorial:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Visualizzazione di un tutorial specifico
router.get("/tutorial/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tutorial = await tutorialService.visualizzazioneTutorial(
      parseInt(id),
    );
    if (tutorial) {
      res.status(200).json(tutorial);
    } else {
      res.status(404).json({ message: "Tutorial non trovato" });
    }
  } catch (error) {
    console.error("Errore durante la visualizzazione del tutorial:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Filtraggio tutorial per categoria o valutazione
router.get("/tutorial/filter", async (req, res) => {
  const { categoria, valutazione } = req.query;
  try {
    const tutorials = await tutorialService.filtroTutorial(
      categoria as string,
      valutazione as "asc" | "desc",
    );
    res.status(200).json(tutorials);
  } catch (error) {
    console.error("Errore durante il filtraggio dei tutorial:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Ricerca tutorial basata su una parola chiave
router.get("/tutorial/search", async (req, res) => {
  const { parolaChiave } = req.query;

  try {
    // Cast a string
    const tutorials = await tutorialService.ricercaTutorial(
      parolaChiave as string,
    );
    res.status(200).json(tutorials);
  } catch (error) {
    console.error("Errore durante la ricerca dei tutorial:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

export default router;
