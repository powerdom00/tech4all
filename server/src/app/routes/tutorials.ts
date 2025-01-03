import express from "express";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import { TutorialService } from "../services/TutorialService";
import { Tutorial } from "../entity/gestione_tutorial/Tutorial";

const router = express.Router();
const tutorialService = new TutorialService();

// Configurazione di multer per il caricamento delle immagini
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/search", async (req, res) => {
  const { parolaChiave } = req.query;

  try {
    const tutorials = await tutorialService.ricercaTutorial(
      parolaChiave as string,
    );
    res.status(200).json(tutorials);
  } catch (error) {
    console.error("Errore durante la ricerca dei tutorial:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Creazione di un nuovo tutorial
router.post("/tutorial", upload.single("grafica"), async (req, res) => {
  const { titolo, testo, categoria } = req.body;
  let grafica = req.file ? req.file.path : null;

  try {
    if (grafica) {
      const outputFilePath = `uploads/resized-${Date.now()}-${
        req.file?.originalname || "default"
      }`;
      await sharp(grafica).resize(1280, 720).toFile(outputFilePath);
      grafica = outputFilePath.replace(/\\/g, "/");
    }

    const nuovoTutorial = new Tutorial(titolo, grafica || "", testo, categoria);
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

export default router;
