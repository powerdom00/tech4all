import { Pool } from "mysql2/promise";
import { Feedback } from "../entity/gestione_feedback/Feedback";
import db from "./db"; // Importa il file di connessione al database

export class FeedbackDao {
  private db: Pool;

  constructor() {
    this.db = db; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutti i feedback
  public async getAllFeedback(): Promise<Feedback[]> {
    const [rows] = await this.db.query("SELECT * FROM feedback");
    return rows.map(
      (row: any) =>
        new Feedback(
          row.valutazione,
          row.commento,
          row.utente_id,
          row.tutorial_id,
          row.id,
        ),
    );
  }

  // Metodo per ottenere un feedback specifico per utente e tutorial
  public async getFeedback(
    utenteId: number,
    tutorialId: number,
  ): Promise<Feedback | null> {
    const [rows] = await this.db.query(
      "SELECT * FROM feedback WHERE utente_id = ? AND tutorial_id = ?",
      [utenteId, tutorialId],
    );
    if (rows.length > 0) {
      const row = rows[0];
      return new Feedback(
        row.valutazione,
        row.commento,
        row.utente_id,
        row.tutorial_id,
        row.id,
      );
    }
    return null;
  }

  // Metodo per creare un nuovo feedback
  public async createFeedback(feedback: Feedback): Promise<void> {
    const { getValutazione, getCommento, getUtenteId, getTutorialId } =
      feedback;
    await this.db.query(
      "INSERT INTO feedback (valutazione, commento, utente_id, tutorial_id) VALUES (?, ?, ?, ?)",
      [getValutazione(), getCommento(), getUtenteId(), getTutorialId()],
    );
  }

  // Metodo per aggiornare un feedback esistente
  public async updateFeedback(feedback: Feedback): Promise<void> {
    const { getId, getValutazione, getCommento, getUtenteId, getTutorialId } =
      feedback;
    if (getId() === undefined) {
      throw new Error("Feedback ID is required for updating.");
    }
    await this.db.query(
      "UPDATE feedback SET valutazione = ?, commento = ?, utente_id = ?, tutorial_id = ? WHERE id = ?",
      [
        getValutazione(),
        getCommento(),
        getUtenteId(),
        getTutorialId(),
        getId(),
      ],
    );
  }

  // Metodo per eliminare un feedback per utente e tutorial
  public async deleteFeedback(
    utenteId: number,
    tutorialId: number,
  ): Promise<void> {
    await this.db.query(
      "DELETE FROM feedback WHERE utente_id = ? AND tutorial_id = ?",
      [utenteId, tutorialId],
    );
  }
}
