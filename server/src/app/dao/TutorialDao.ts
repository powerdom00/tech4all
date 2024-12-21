import { RowDataPacket, FieldPacket, Pool } from "mysql2/promise";
import { Tutorial } from "../entity/gestione_tutorial/Tutorial";
import pool from "../../db";

export class TutorialDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutti i tutorial
  public async getAllTutorials(): Promise<Tutorial[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM tutorial",
    );
    return rows.map(
      (row: RowDataPacket) =>
        new Tutorial(
          row.titolo,
          row.grafica,
          row.testo,
          row.categoria,
          row.valutazione,
          row.id,
        ),
    );
  }

  // Metodo per ottenere un tutorial specifico per ID
  public async getTutorialById(id: number): Promise<Tutorial | null> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM tutorial WHERE id = ?",
      id,
    );
    if (rows.length > 0) {
      const row = rows[0];
      return new Tutorial(
        row.titolo,
        row.grafica,
        row.testo,
        row.categoria,
        row.valutazione,
        row.id,
      );
    }
    return null;
  }

  // Metodo per creare un nuovo tutorial
  public async createTutorial(tutorial: Tutorial): Promise<void> {
    const Titolo = tutorial.getTitolo();
    const grafica = tutorial.getGrafica();
    const testo = tutorial.getTesto();
    const categoria = tutorial.getCategoria();
    const valutazione = tutorial.getValutazione();
    await this.db.query(
      "INSERT INTO tutorial (titolo, grafica, testo, categoria, valutazione) VALUES (?, ?, ?, ?, ?)",
      [Titolo, grafica, testo, categoria, valutazione],
    );
  }

  // Metodo per aggiornare un tutorial esistente
  public async updateTutorial(tutorial: Tutorial): Promise<void> {
    const Id = tutorial.getId();
    const Titolo = tutorial.getTitolo();
    const grafica = tutorial.getGrafica();
    const testo = tutorial.getTesto();
    const categoria = tutorial.getCategoria();
    const valutazione = tutorial.getValutazione();
    if (Id === undefined) {
      throw new Error("Tutorial ID is required for updating.");
    }
    await this.db.query(
      "UPDATE tutorial SET titolo = ?, grafica = ?, testo = ?, categoria = ?, valutazione = ? WHERE id = ?",
      [Titolo, grafica, testo, categoria, valutazione, Id],
    );
  }

  // Metodo per eliminare un tutorial
  public async deleteTutorial(id: number): Promise<void> {
    await this.db.query("DELETE FROM tutorial WHERE id = ?", [id]);
  }
}
