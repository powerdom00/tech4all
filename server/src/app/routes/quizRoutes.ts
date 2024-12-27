import express from "express";
import { QuizService } from "../services/QuizService";

const router = express.Router();
const quizService = new QuizService();

// Creazione di un nuovo quiz
router.post("/creaQuiz", async (req, res) => {
  try {
    const { quiz, domande } = req.body;
    const result = await quizService.creaQuiz(quiz, domande);
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
    res.status(result.length > 0 ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
});
