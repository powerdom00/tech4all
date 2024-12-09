import { Pool, RowDataPacket, FieldPacket } from "mysql2/promise";
import { Conseguimento } from "../entity/gestione_badge_obiettivi/Conseguimento";
import pool from "../../db"; // Importa il file di connessione al database

export class ConseguimentoDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutti i conseguimenti
  public async getAllConseguimenti(): Promise<Conseguimento[]> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      "SELECT * FROM conseguimento",
    );
    return rows.map(
      //la riga subito sotto disabilita l'errore di tipo any, per permettere di vedere gli errori della riga sottostante, cancellare il commento di sotto.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row: any) =>
        new Conseguimento(
          row.utente_id,
          row.obiettivo_nome,
          new Date(row.data_conseguimento),
        ),
    );
  }

  // Metodo per ottenere un conseguimento specifico per utente e obiettivo
  public async getConseguimento(
    utenteId: number,
    obiettivoNome: string,
  ): Promise<Conseguimento | null> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM conseguimento WHERE utente_id = ? AND obiettivo_nome = ?",
      [utenteId, obiettivoNome],
    );
    if (rows.length > 0 && rows != null) {
      const row = rows[0];
      return new Conseguimento(
        row.utente_id,
        row.obiettivo_nome,
        new Date(row.data_conseguimento),
      );
    }
    return null;
  }

  // Metodo per creare un nuovo conseguimento
  public async createConseguimento(
    conseguimento: Conseguimento,
  ): Promise<void> {
    const idUtente = conseguimento.getUtenteId();
    const nomeObiettivo = conseguimento.getObiettivoNome();
    const data = conseguimento.getDataConseguimento();
    await this.db.query(
      "INSERT INTO conseguimento (utente_id, obiettivo_nome, data_conseguimento) VALUES (?, ?, ?)",
      [idUtente, nomeObiettivo, data],
    );
  }

  // Metodo per aggiornare un conseguimento esistente
  public async updateConseguimento(
    conseguimento: Conseguimento,
  ): Promise<void> {
    const Utenteid = conseguimento.getUtenteId();
    const ObiettivoNome = conseguimento.getObiettivoNome();
    const DataConseguimento = conseguimento.getDataConseguimento();
    await this.db.query(
      "UPDATE conseguimento SET data_conseguimento = ? WHERE utente_id = ? AND obiettivo_nome = ?",
      [Utenteid, ObiettivoNome, DataConseguimento],
    );
  }

  // Metodo per eliminare un conseguimento per utente e obiettivo
  public async deleteConseguimento(
    utenteId: number,
    obiettivoNome: string,
  ): Promise<void> {
    await this.db.query(
      "DELETE FROM conseguimento WHERE utente_id = ? AND obiettivo_nome = ?",
      [utenteId, obiettivoNome],
    );
  }
}
