import { Pool, RowDataPacket, FieldPacket } from "mysql2/promise";
import { Svolgimento } from "../entity/gestione_quiz/Svolgimento";
import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Utente } from "../entity/gestione_autenticazione/utente";
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
  //QUESTO METODO è DA RIVEDERE UNA ATTIMO
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
        svolgimenti.push(new Svolgimento(quiz, utente, row.esito));
      }
    }
    return svolgimenti;
  }

  // Metodo per ottenere uno svolgimento specifico per ID
  //ELIMINATO, NON ESISTE L'ID PER SVOLGIMENTO, VIENE IDENTIFICATO TRAMITE QUIZ E UTENTE

  // Metodo per creare un nuovo svolgimento
  public async createSvolgimento(svolgimento: Svolgimento): Promise<void> {
    const Quiz = svolgimento.getQuiz();
    const Utente = svolgimento.getUtente();
    const eisto = svolgimento.getEsito();
    await this.db.query(
      "INSERT INTO svolgimento (quizId, utenteId, esito) VALUES (?, ?, ?)",
      [Quiz.getId(), Utente.getId(), eisto],
    );
  }

  // Metodo per aggiornare uno svolgimento esistente
  public async updateSvolgimento(svolgimento: Svolgimento): Promise<void> {
    const quiz: Quiz = svolgimento.getQuiz();
    const utente: Utente = svolgimento.getUtente();
    const esito = svolgimento.getEsito();
    if (quiz === undefined || utente === undefined) {
      throw new Error("Quiz ID and Utente ID are required for updating.");
    }
    await this.db.query(
      "UPDATE svolgimento SET quizId = ?, utenteId = ?, esito = ? WHERE id = ?",
      [utente.getId(), esito, quiz.getId()], // Sostituire con ID corretto se presente
    );
  }

  // Metodo per eliminare uno svolgimento
  public async deleteSvolgimento(id: number): Promise<void> {
    await this.db.query("DELETE FROM svolgimento WHERE id = ?", [id]);
  }
}
