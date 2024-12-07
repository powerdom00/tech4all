import { FieldPacket, Pool, RowDataPacket } from "mysql2/promise";
import { Domanda } from "../entity/gestione_quiz/Domanda";
import { Risposta } from "../entity/gestione_quiz/Risposta";
import pool from "../../db"; // Importa il file di connessione al database

export class DomandaDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutte le domande
  public async getAllDomande(): Promise<Domanda[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM domanda",
    );
    const domande: Domanda[] = [];

    for (const row of rows) {
      const risposte = await this.getRisposteByDomandaId(row.id);
      domande.push(new Domanda(row.quiz_id, row.domanda, risposte, row.id));
    }

    return domande;
  }

  // Metodo per ottenere una domanda specifica per ID
  public async getDomandaById(id: number): Promise<Domanda | null> {
    //si disabilità l'errore per fields.
    //fields non viene mai usato ma serve per dichiarare correttamente il tipo della tupla perchè matchi con
    //i valori inseriti dopo
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM domanda WHERE id = ?",
      [id],
    );
    if (rows.length > 0) {
      const row = rows[0];
      const risposte = await this.getRisposteByDomandaId(row.id);
      return new Domanda(row.quiz_id, row.domanda, risposte, row.id);
    }
    return null;
  }

  // Metodo per ottenere tutte le risposte associate a una domanda
  private async getRisposteByDomandaId(domandaId: number): Promise<Risposta[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM risposta WHERE domanda_id = ?",
      [domandaId], //domandaId corrisponde a fields, è il campo che andiamo ad inserire
    );
    return rows.map(
      (row: RowDataPacket) =>
        new Risposta(row.id, row.testo, row.correct, row.domanda_id),
    );
  }

  // Metodo per creare una nuova domanda
  public async createDomanda(domanda: Domanda): Promise<void> {
    //questo tipo di correzioni ci sono in tutti i dao, fondamentalmente i campi che si cercava di prendere
    // erano attributi privati, quindi sono stati sostituiti con i metodi getter
    const quizId = domanda.getQuizId();
    const domandaId = domanda.getDomanda();
    this.db.query("INSERT INTO domanda (quiz_id, domanda) VALUES (?, ?)", [
      quizId,
      domandaId,
    ]);
  }

  // Metodo per aggiornare una domanda esistente
  public async updateDomanda(domanda: Domanda): Promise<void> {
    const id = domanda.getId();
    const quizId = domanda.getQuizId();
    const dmd = domanda.getDomanda();
    if (id === undefined) {
      throw new Error("Domanda ID is required for updating.");
    }
    await this.db.query(
      "UPDATE domanda SET quiz_id = ?, domanda = ? WHERE id = ?",
      [quizId, dmd, id],
    );
  }

  // Metodo per eliminare una domanda
  public async deleteDomanda(id: number): Promise<void> {
    await this.db.query("DELETE FROM domanda WHERE id = ?", [id]);
  }
}
