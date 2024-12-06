import { Pool } from "mysql2/promise";
import { Svolgimento } from "../entity/gestione_quiz/Svolgimento";
import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Utente } from "../entity/gestione_autenticazione/Utente";
import pool from "../../db";

export class SvolgimentoDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutti gli svolgimenti
  public async getAllSvolgimenti(): Promise<Svolgimento[]> {
    const [rows] = await this.db.query("SELECT * FROM svolgimento");
    return rows.map(
      (row: any) =>
        new Svolgimento(
          new Quiz(row.quizId), // Assumendo che il costruttore di Quiz accetti solo un ID per ora
          new Utente(row.utenteId), // Assumendo che il costruttore di Utente accetti solo un ID per ora
          row.esito,
        ),
    );
  }

  // Metodo per ottenere uno svolgimento specifico per ID
  public async getSvolgimentoById(id: number): Promise<Svolgimento | null> {
    const [rows] = await this.db.query(
      "SELECT * FROM svolgimento WHERE id = ?",
      [id],
    );
    if (rows.length > 0) {
      const row = rows[0];
      return new Svolgimento(
        new Quiz(row.quizId),
        new Utente(row.utenteId),
        row.esito,
      );
    }
    return null;
  }

  // Metodo per creare un nuovo svolgimento
  public async createSvolgimento(svolgimento: Svolgimento): Promise<void> {
    const { getQuiz, getUtente, getEsito } = svolgimento;
    const [result] = await this.db.query(
      "INSERT INTO svolgimento (quizId, utenteId, esito) VALUES (?, ?, ?)",
      [getQuiz().getId(), getUtente().getId(), getEsito()],
    );
    const insertedId = (result as any).insertId;
    // Se necessario, imposta l'ID nel oggetto Svolgimento creato.
  }

  // Metodo per aggiornare uno svolgimento esistente
  public async updateSvolgimento(svolgimento: Svolgimento): Promise<void> {
    const { getQuiz, getUtente, getEsito } = svolgimento;
    if (getQuiz().getId() === undefined || getUtente().getId() === undefined) {
      throw new Error("Quiz ID and Utente ID are required for updating.");
    }
    await this.db.query(
      "UPDATE svolgimento SET quizId = ?, utenteId = ?, esito = ? WHERE id = ?",
      [getQuiz().getId(), getUtente().getId(), getEsito(), getQuiz().getId()], // Sostituire con ID corretto se presente
    );
  }

  // Metodo per eliminare uno svolgimento
  public async deleteSvolgimento(id: number): Promise<void> {
    await this.db.query("DELETE FROM svolgimento WHERE id = ?", [id]);
  }
}
