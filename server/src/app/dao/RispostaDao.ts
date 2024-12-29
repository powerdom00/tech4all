import { FieldPacket, Pool, RowDataPacket } from "mysql2/promise";
import { Risposta } from "../entity/gestione_quiz/Risposta";
import pool from "../../db";

export class RispostaDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutte le risposte
  public async getAllRisposte(): Promise<Risposta[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM risposta"
    );
    return rows.map(
      (row: RowDataPacket) =>
        new Risposta(row.id, row.domanda_id, row.risposta, row.corretta)
    );
  }

  // Metodo per ottenere una risposta specifica per id
  public async getRisposta(id: number): Promise<Risposta | null> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM risposta WHERE id = ?",
      id
    );
    if (rows.length > 0) {
      const row = rows[0];
      return new Risposta(row.id, row.domanda_id, row.risposta, row.corretta);
    }
    return null;
  }

  // Metodo per creare una nuova risposta
  public async createRisposta(
    risposta: Risposta,
    domandaId: number | undefined
  ): Promise<void> {
    const risp = risposta.getRisposta();
    const corretta = risposta.getCorretta();
    const [result]: any = await this.db.query(
      "INSERT INTO risposta (domanda_id, risposta, corretta) VALUES (?, ?, ?)",
      [domandaId, risp, corretta]
    );
    risposta.setId(result.insertId);
  }

  // Metodo per aggiornare una risposta esistente
  public async updateRisposta(risposta: Risposta): Promise<void> {
    const id = risposta.getId();
    const domandaId = risposta.getDomandaId();
    const risp = risposta.getRisposta();
    const corretta = risposta.getCorretta();
    await this.db.query(
      "UPDATE risposta SET domanda_id = ?, risposta = ?, corretta = ? WHERE id = ?",
      [id, domandaId, risp, corretta]
    );
  }

  // Metodo per eliminare una risposta per id
  public async deleteRisposta(id: number): Promise<void> {
    await this.db.query("DELETE FROM risposta WHERE id = ?", [id]);
  }
}
