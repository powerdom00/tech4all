import express from "express";
import { QuizService } from "../services/QuizService";
import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Domanda } from "../entity/gestione_quiz/Domanda";
import { Risposta } from "../entity/gestione_quiz/Risposta";

const router = express.Router();
const quizService = new QuizService();

// Creazione di un nuovo quiz
router.post("/creaQuiz", async (req, res) => {
  try {
    const quizData = req.body.quiz;
    const domandeData = quizData.domande;

    // Creazione delle istanze di Risposta
    const domande = domandeData.map((domanda: any) => {
      const risposte = domanda.risposte.map(
        (risposta: any) => new Risposta(risposta.risposta, risposta.corretta),
      );
      return new Domanda(domanda.domanda, risposte);
    });

    // Creazione dell'istanza di Quiz
    const quiz = new Quiz(quizData.tutorialId, domande);

    console.log(quiz, domande);
    const result = await quizService.creaQuiz(quiz);
    res.status(result.success ? 201 : 400).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
});

router.delete("/eliminaQuiz/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await quizService.eliminaQuiz(Number(id));
    res.status(result.success ? 200 : 404).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
});

// Esecuzione di un quiz
router.post("/eseguiQuiz", async (req, res) => {
  try {
    const { quizId, risposteUtente, utenteId } = req.body;
    const result = await quizService.eseguiQuiz(
      quizId,
      utenteId,
      risposteUtente,
    );
    res
      .status(result.success ? 200 : 400)
      .json({ message: result.message, esito: result.esito });
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
});

//Route visualizzazione quiz da tutorialId
router.get("/visualizzaQuiz/:tutorialId", async (req, res) => {
  try {
    const { tutorialId } = req.params;
    const result = await quizService.getQuizByTutorialId(Number(tutorialId));
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Quiz non trovato" });
    }
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
});

export default router;
