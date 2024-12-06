import { Pool } from "mysql2/promise";
import { Tutorial } from "../entity/gestione_tutorial/Tutorial";
import pool from "../../db";

export class TutorialDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutti i tutorial
  public async getAllTutorials(): Promise<Tutorial[]> {
    const [rows] = await this.db.query("SELECT * FROM tutorial");
    return rows.map(
      (row: any) =>
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
    const [rows] = await this.db.query("SELECT * FROM tutorial WHERE id = ?", [
      id,
    ]);
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
    const { getTitolo, getGrafica, getTesto, getCategoria, getValutazione } =
      tutorial;
    const [result] = await this.db.query(
      "INSERT INTO tutorial (titolo, grafica, testo, categoria, valutazione) VALUES (?, ?, ?, ?, ?)",
      [getTitolo(), getGrafica(), getTesto(), getCategoria(), getValutazione()],
    );
    const insertedId = (result as any).insertId;
    tutorial.setId(insertedId);
  }

  // Metodo per aggiornare un tutorial esistente
  public async updateTutorial(tutorial: Tutorial): Promise<void> {
    const {
      getId,
      getTitolo,
      getGrafica,
      getTesto,
      getCategoria,
      getValutazione,
    } = tutorial;
    if (getId() === undefined) {
      throw new Error("Tutorial ID is required for updating.");
    }
    await this.db.query(
      "UPDATE tutorial SET titolo = ?, grafica = ?, testo = ?, categoria = ?, valutazione = ? WHERE id = ?",
      [
        getTitolo(),
        getGrafica(),
        getTesto(),
        getCategoria(),
        getValutazione(),
        getId(),
      ],
    );
  }

  // Metodo per eliminare un tutorial
  public async deleteTutorial(id: number): Promise<void> {
    await this.db.query("DELETE FROM tutorial WHERE id = ?", [id]);
  }
}
