import { QuizDao } from "../dao/QuizDao";
import { DomandaDao } from "../dao/DomandaDao";
import { RispostaDao } from "../dao/RispostaDao";
import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Domanda } from "../entity/gestione_quiz/Domanda";
//import { Risposta } from "../entity/gestione_quiz/Risposta";
import { SvolgimentoDao } from "../dao/SvolgimentoDao";
import { Svolgimento } from "../entity/gestione_quiz/Svolgimento";
import { Utente } from "../entity/gestione_autenticazione/Utente";
import { UtenteDao } from "../dao/UtenteDao";

export class QuizService {
  private quizDao: QuizDao;
  private domandaDao: DomandaDao;
  private rispostaDao: RispostaDao;
  private svolgimentoDao: SvolgimentoDao;
  private utenteDao: UtenteDao;

  constructor() {
    this.quizDao = new QuizDao();
    this.domandaDao = new DomandaDao();
    this.rispostaDao = new RispostaDao();
    this.svolgimentoDao = new SvolgimentoDao();
    this.utenteDao = new UtenteDao();
  }

  // Creazione di un nuovo quiz con domande e risposte
  async creaQuiz(
    quiz: Quiz,
    domande: Domanda[], // Una lista di domande con risposte
  ): Promise<{ success: boolean; message: string }> {
    try {
      // 1. Creazione del quiz
      await this.quizDao.createQuiz(quiz);

      // 2. Creazione delle domande associate al quiz
      for (const domanda of domande) {
        await this.domandaDao.createDomanda(domanda);

        // 3. Creazione delle risposte per ogni domanda
        for (const risposta of domanda.getRisposte()) {
          await this.rispostaDao.createRisposta(risposta);
        }
      }

      return {
        success: true,
        message: "Quiz creato con successo con tutte le domande e risposte.",
      };
    } catch (error) {
      console.error("Errore durante la creazione del quiz:", error);
      return {
        success: false,
        message: "Errore interno del server. Riprova più tardi.",
      };
    }
  }

  // Eliminazione di un quiz (e relative domande e risposte)
  async eliminaQuiz(
    id: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const quiz = await this.quizDao.getQuizById(id);
      if (!quiz) {
        return {
          success: false,
          message: "Quiz non trovato.",
        };
      }

      // 1. Eliminare le risposte associate a tutte le domande del quiz
      const domande = await this.domandaDao.getAllDomande();
      for (const domanda of domande) {
        if (domanda.getQuizId() === id) {
          const risposte = domanda.getRisposte();
          for (const risposta of risposte) {
            await this.rispostaDao.deleteRisposta(risposta.getId()!);
          }
          // 2. Eliminare le domande del quiz
          await this.domandaDao.deleteDomanda(domanda.getId()!);
        }
      }

      // 3. Eliminare il quiz
      await this.quizDao.deleteQuiz(id);

      return {
        success: true,
        message: "Quiz e relative domande e risposte eliminati con successo.",
      };
    } catch (error) {
      console.error("Errore durante l'eliminazione del quiz:", error);
      return {
        success: false,
        message: "Errore interno del server. Riprova più tardi.",
      };
    }
  }

  // Esecuzione del quiz (per un utente specifico)
  async eseguiQuiz(
    quizId: number,
    utente: Utente,
    risposteFornite: number[], // Lista di ID delle risposte scelte dall'utente
  ): Promise<{ success: boolean; message: string; esito: boolean }> {
    try {
      const quiz = await this.quizDao.getQuizById(quizId);
      if (!quiz) {
        return {
          success: false,
          message: "Quiz non trovato.",
          esito: false,
        };
      }

      // Recupero delle domande associate al quiz
      const domande = quiz.getDomande();

      // Calcolare le risposte corrette
      let risposteEsatte = 0;
      for (let i = 0; i < domande.length; i++) {
        const domanda = domande[i];
        const rispostaCorretta = domanda
          .getRisposte()
          .find((risposta) => risposta.getCorretta());

        // Controlla se la risposta fornita dall'utente è corretta
        if (
          rispostaCorretta &&
          rispostaCorretta.getId() === risposteFornite[i]
        ) {
          risposteEsatte++;
        }
      }

      // Determina se il quiz è stato superato (ad esempio, almeno 70% di risposte corrette)
      const esito = risposteEsatte / domande.length >= 0.7;

      // 1. Registra il risultato dello svolgimento
      const svolgimento = new Svolgimento(
        quiz,
        utente,
        esito,
        new Date(),
        risposteEsatte,
      );
      await this.svolgimentoDao.createSvolgimento(svolgimento);
      if (esito) {
        utente.setQuizSuperati(utente.getQuizSuperati() + 1);
        this.utenteDao.updateQuizSuperati(utente);
      }

      return {
        success: true,
        message: "Quiz eseguito con successo.",
        esito: esito,
      };
    } catch (error) {
      console.error("Errore durante l'esecuzione del quiz:", error);
      return {
        success: false,
        message: "Errore durante l'esecuzione del quiz.",
        esito: false,
      };
    }
  }

  // recupera quiz per tutorial id
  async getQuizByTutorialId(tutorialId: number): Promise<Quiz[]> {
    try {
      const quizzes = await this.quizDao.getQuizByTutorialId(tutorialId);
      if (!quizzes) {
        return [];
      }
      return Array.isArray(quizzes) ? quizzes : [quizzes];
    } catch (error) {
      console.error("Errore durante il recupero del quiz:", error);
      return [];
    }
  }
}
