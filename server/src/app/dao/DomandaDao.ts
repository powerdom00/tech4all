import { Pool } from "mysql2/promise";
import { Domanda } from "../entity/gestione_quiz/Domanda";
import { Risposta } from "../entity/gestione_quiz/Risposta";
import pool from "../../db";; // Importa il file di connessione al database

export class DomandaDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutte le domande
  public async getAllDomande(): Promise<Domanda[]> {
    const [rows] = await this.db.query("SELECT * FROM domanda");
    const domande: Domanda[] = [];

    for (const row of rows) {
      const risposte = await this.getRisposteByDomandaId(row.id);
      domande.push(new Domanda(row.quiz_id, row.domanda, risposte, row.id));
    }

    return domande;
  }

  // Metodo per ottenere una domanda specifica per ID
  public async getDomandaById(id: number): Promise<Domanda | null> {
    const [rows] = await this.db.query("SELECT * FROM domanda WHERE id = ?", [
      id,
    ]);
    if (rows.length > 0) {
      const row = rows[0];
      const risposte = await this.getRisposteByDomandaId(row.id);
      return new Domanda(row.quiz_id, row.domanda, risposte, row.id);
    }
    return null;
  }

  // Metodo per ottenere tutte le risposte associate a una domanda
  private async getRisposteByDomandaId(domandaId: number): Promise<Risposta[]> {
    const [rows] = await this.db.query(
      "SELECT * FROM risposta WHERE domanda_id = ?",
      [domandaId],
    );
    return rows.map(
      (row: any) =>
        new Risposta(row.id, row.testo, row.correct, row.domanda_id),
    );
  }

  // Metodo per creare una nuova domanda
  public async createDomanda(domanda: Domanda): Promise<void> {
    const { getQuizId, getDomanda } = domanda;
    const [result] = await this.db.query(
      "INSERT INTO domanda (quiz_id, domanda) VALUES (?, ?)",
      [getQuizId(), getDomanda()],
    );
    const insertedId = (result as any).insertId;
    domanda.setId(insertedId);
  }

  // Metodo per aggiornare una domanda esistente
  public async updateDomanda(domanda: Domanda): Promise<void> {
    const { getId, getQuizId, getDomanda } = domanda;
    if (getId() === undefined) {
      throw new Error("Domanda ID is required for updating.");
    }
    await this.db.query(
      "UPDATE domanda SET quiz_id = ?, domanda = ? WHERE id = ?",
      [getQuizId(), getDomanda(), getId()],
    );
  }

  // Metodo per eliminare una domanda
  public async deleteDomanda(id: number): Promise<void> {
    await this.db.query("DELETE FROM domanda WHERE id = ?", [id]);
  }
}
