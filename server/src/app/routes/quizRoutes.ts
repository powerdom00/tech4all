import express from "express";
import { QuizService } from "../services/QuizService";
import { Utente } from "../entity/gestione_autenticazione/Utente";
import { UtenteDao } from "../dao/UtenteDao";

const router = express.Router();
const quizService = new QuizService();

// 1. Creazione di un nuovo quiz
router.post("/creaQuiz", async (req, res) => {
  const { tutorialId, domande } = req.body;

  // Controllo dei dati inviati nel body
  if (!tutorialId || !Array.isArray(domande) || domande.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Dati del quiz non validi." });
  }

  try {
    const result = await quizService.creaQuiz({ tutorialId, domande });
    if (result.success) {
      return res.status(201).json(result); // Restituisci una risposta di successo
    } else {
      return res.status(500).json(result); // Restituisci errore interno
    }
  } catch (error) {
    console.error("Errore durante la creazione del quiz:", error);
    return res
      .status(500)
      .json({ message: "Errore interno del server", error });
  }
});

// 2. Eliminazione di un quiz
router.delete("/eliminaQuiz/:id", async (req, res) => {
  const { id } = req.params;

  // Verifica se l'ID è valido
  const quizId = parseInt(id);
  if (isNaN(quizId)) {
    return res
      .status(400)
      .json({ success: false, message: "ID del quiz non valido." });
  }

  try {
    const result = await quizService.eliminaQuiz(quizId);
    if (result.success) {
      return res.status(200).json(result); // Quiz eliminato correttamente
    } else {
      return res.status(404).json(result); // Quiz non trovato
    }
  } catch (error) {
    console.error("Errore durante la cancellazione del quiz:", error);
    return res
      .status(500)
      .json({ message: "Errore interno del server", error });
  }
});

// 3. Esecuzione di un quiz
router.post("/quiz/:id/esecuzione", async (req, res) => {
  const { id } = req.params;
  const { risposteUtente, utenteId } = req.body;

  // Verifica se i dati sono completi
  if (!Array.isArray(risposteUtente) || risposteUtente.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Risposte utente non valide." });
  }

  try {
    // Recupera l'utente dal database
    const utente = await new UtenteDao().getUtenteById(utenteId);
    if (!utente) {
      return res
        .status(404)
        .json({ success: false, message: "Utente non trovato." });
    }

    // Chiamata al servizio per eseguire il quiz
    const result = await quizService.eseguiQuiz(
      parseInt(id),
      utente,
      risposteUtente,
    );

    if (result.success) {
      return res.status(200).json(result); // Risultato dell'esecuzione del quiz
    } else {
      return res.status(500).json(result); // Errore durante l'esecuzione del quiz
    }
  } catch (error) {
    console.error("Errore durante l'esecuzione del quiz:", error);
    return res
      .status(500)
      .json({ message: "Errore interno del server", error });
  }
});

// 4. Visualizzazione dei quiz di un tutorial
router.get("/quiz/tutorial/:tutorialId", async (req, res) => {
  const { tutorialId } = req.params;

  // Verifica se il tutorialId è valido
  const parsedTutorialId = parseInt(tutorialId);
  if (isNaN(parsedTutorialId)) {
    return res
      .status(400)
      .json({ success: false, message: "ID del tutorial non valido." });
  }

  try {
    // Chiamata al servizio per recuperare i quiz associati al tutorial
    const result = await quizService.getQuizByTutorialId(parsedTutorialId);

    if (result.success) {
      return res.status(200).json(result); // Quiz recuperati correttamente
    } else {
      return res.status(404).json(result); // Nessun quiz trovato per il tutorial
    }
  } catch (error) {
    console.error("Errore durante la visualizzazione dei quiz:", error);
    return res
      .status(500)
      .json({ message: "Errore interno del server", error });
  }
});

export default router;
