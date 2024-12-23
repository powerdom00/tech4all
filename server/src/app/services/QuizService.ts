import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Svolgimento } from "../entity/gestione_quiz/Svolgimento";
import { QuizDao } from "../dao/QuizDao";
import { SvolgimentoDao } from "../dao/SvolgimentoDao";

export class QuizService {
  private quizDao: QuizDao;
  private svolgimentoDao: SvolgimentoDao;

  constructor() {
    this.quizDao = new QuizDao();
    this.svolgimentoDao = new SvolgimentoDao();
  }

  // Metodo per creare un nuovo quiz
  async creaQuiz(quiz: Quiz): Promise<Quiz> {
    try {
      return await this.quizDao.createQuiz(quiz);
    } catch (error) {
      console.error("Errore durante la creazione del quiz:", error);
      throw new Error("Errore interno del server.");
    }
  }

  // Metodo per eliminare un quiz per ID
  async eliminaQuiz(quizId: number): Promise<void> {
    try {
      await this.quizDao.deleteQuiz(quizId);
    } catch (error) {
      console.error("Errore durante l'eliminazione del quiz:", error);
      throw new Error("Errore interno del server.");
    }
  }


  // Metodo per registrare lo svolgimento di un quiz
  async registraSvolgimento(svolgimento: Svolgimento): Promise<void> {
    try {
      await this.svolgimentoDao.registraSvolgimento(svolgimento);
    } catch (error) {
      console.error("Errore durante la registrazione dello svolgimento del quiz:", error);
      throw new Error("Errore interno del server.");
    }
  }

  // Metodo per eseguire un quiz
  async eseguiQuiz(quizId: number, risposte: Risposta[]): Promise<Svolgimento> {
    try {
      const quiz = await this.getQuizById(quizId);
      if (!quiz) {
        throw new Error("Quiz non trovato.");
      }

      const svolgimento = new Svolgimento();
      svolgimento.quiz = quiz;
      svolgimento.risposte = risposte;

      await this.registraSvolgimento(svolgimento);
      return svolgimento;
    } catch (error) {
      console.error("Errore durante l'esecuzione del quiz:", error);
      throw new Error("Errore interno del server.");
    }
  }
}