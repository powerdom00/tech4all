import { FieldPacket, Pool, RowDataPacket } from "mysql2/promise";
import { Feedback } from "../entity/gestione_feedback/Feedback";
import pool from "../../db"; // Importa il file di connessione al database

export class FeedbackDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutti i feedback
  public async getAllFeedback(): Promise<Feedback[]> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      //aggiunta tipo RowDataPacket[] per evitare il problema di any nel map
      "SELECT * FROM feedback",
    );
    return rows.map(
      (row: RowDataPacket) =>
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
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
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
    const valutazione = feedback.getValutazione();
    const commento = feedback.getCommento();
    const idUtente = feedback.getUtenteId();
    const idTutorial = feedback.getTutorialId();
    await this.db.query(
      "INSERT INTO feedback (valutazione, commento, utente_id, tutorial_id) VALUES (?, ?, ?, ?)",
      [valutazione, commento, idUtente, idTutorial],
    );
  }

  // Metodo per aggiornare un feedback esistente
  public async updateFeedback(feedback: Feedback): Promise<void> {
    const id = feedback.getId();
    const valutazione = feedback.getValutazione();
    const commento = feedback.getCommento();
    const idUtente = feedback.getUtenteId();
    const idTutorila = feedback.getTutorialId();
    if (id === 0) {
      throw new Error("Feedback ID is required for updating.");
      //andrà sostituita con un'eccezione personalizzata (vincoli);
    }
    await this.db.query(
      "UPDATE feedback SET valutazione = ?, commento = ?, utente_id = ?, tutorial_id = ? WHERE id = ?",
      [valutazione, commento, idUtente, idTutorila, id],
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
