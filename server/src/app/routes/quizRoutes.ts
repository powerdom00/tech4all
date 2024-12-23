import express from "express";
import { QuizService } from "../services/QuizService";
import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Risposta } from "../entity/gestione_quiz/Risposta";

const router = express.Router();

// Creazione di un nuovo quiz
router.post("/create", async (req, res) => {
  const quizData: Quiz = req.body;
  try {
    const quizService = new QuizService();
    const quiz = await quizService.creaQuiz(quizData);

    res.status(201).json({ message: "Quiz creato con successo", quiz });
  } catch (error) {
    console.error("Errore durante la creazione del quiz:", error);
    res.status(500).json({ message: "Errore interno del server", error });
  }
});

// Eliminazione di un quiz per ID
router.delete("/delete/:quizId", async (req, res) => {
  const quizId = parseInt(req.params.quizId);
  try {
    const quizService = new QuizService();
    await quizService.eliminaQuiz(quizId);

    res.status(200).json({ message: "Quiz eliminato con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione del quiz:", error);
    res.status(500).json({ message: "Errore interno del server", error });
  }
});

// Esecuzione di un quiz
router.post("/execute/:quizId", async (req, res) => {
  const quizId = parseInt(req.params.quizId);
  const risposte: Risposta[] = req.body.risposte;

  try {
    const quizService = new QuizService();
    const svolgimento = await quizService.eseguiQuiz(quizId, risposte);

    res.status(200).json({ message: "Quiz eseguito con successo", svolgimento });
  } catch (error) {
    console.error("Errore durante l'esecuzione del quiz:", error);
    res.status(500).json({ message: "Errore interno del server", error });
  }
});

export default router;
