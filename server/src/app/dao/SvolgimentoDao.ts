import { Pool, RowDataPacket, FieldPacket } from "mysql2/promise";
import { Svolgimento } from "../entity/gestione_quiz/Svolgimento";
import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Utente } from "../entity/gestione_autenticazione/Utente";
import pool from "../../db";
import { QuizDao } from "./QuizDao";
import { UtenteDao } from "./UtenteDao";

export class SvolgimentoDao {
  private db: Pool;
  private daoQuiz!: QuizDao;
  private daoUtente!: UtenteDao;

  constructor() {
    this.db = pool; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutti gli svolgimenti
  public async getAllSvolgimenti(): Promise<Svolgimento[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM svolgimento",
    );
    const svolgimenti: Svolgimento[] = [];
    for (const row of rows) {
      const quiz: Quiz | null = await this.daoQuiz.getQuizById(row.quiz_id);
      const utente: Utente | null = await this.daoUtente.getUtenteById(
        row.utente_id,
      );
      if (quiz && utente) {
        svolgimenti.push(new Svolgimento(
          quiz,
          utente,
          row.esito,
          new Date(row.dataConseguimento),
          row.risposteEsatte
        ));
      }
    }
    return svolgimenti;
  }

  // Metodo per creare un nuovo svolgimento
  public async createSvolgimento(svolgimento: Svolgimento): Promise<void> {
    const quiz = svolgimento.getQuiz();
    const utente = svolgimento.getUtente();
    const esito = svolgimento.getEsito();
    const dataConseguimento = svolgimento.getDataConseguimento();
    const risposteEsatte = svolgimento.getRisposteEsatte();
    await this.db.query(
      "INSERT INTO svolgimento (quizId, utenteId, esito, dataConseguimento, risposteEsatte) VALUES (?, ?, ?, ?, ?)",
      [quiz.getId(), utente.getId(), esito, dataConseguimento, risposteEsatte],
    );
  }

  // Metodo per aggiornare uno svolgimento esistente
  public async updateSvolgimento(svolgimento: Svolgimento): Promise<void> {
    const quiz = svolgimento.getQuiz();
    const utente = svolgimento.getUtente();
    const esito = svolgimento.getEsito();
    const dataConseguimento = svolgimento.getDataConseguimento();
    const risposteEsatte = svolgimento.getRisposteEsatte();
    if (quiz === undefined || utente === undefined) {
      throw new Error("Quiz ID and Utente ID are required for updating.");
    }
    await this.db.query(
      "UPDATE svolgimento SET quizId = ?, utenteId = ?, esito = ?, dataConseguimento = ?, risposteEsatte = ? WHERE quizId = ? AND utenteId = ?",
      [quiz.getId(), utente.getId(), esito, dataConseguimento, risposteEsatte, quiz.getId(), utente.getId()],
    );
  }

  // Metodo per eliminare uno svolgimento
  public async deleteSvolgimento(quizId: number, utenteId: number): Promise<void> {
    await this.db.query("DELETE FROM svolgimento WHERE quizId = ? AND utenteId = ?", [quizId, utenteId]);
  }
}

