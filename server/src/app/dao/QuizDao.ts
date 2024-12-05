import { Pool } from "mysql2/promise";
import { Quiz } from "./Quiz";
import { Domanda } from "./Domanda";
import { Risposta } from "./Risposta";
import db from "./db"; // Importa il modulo di connessione al database

export class QuizDao {
  private db: Pool;

  constructor() {
    this.db = db; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutti i quiz
  public async getAllQuiz(): Promise<Quiz[]> {
    const [rows] = await this.db.query("SELECT * FROM quiz");
    const quizList: Quiz[] = [];

    for (const row of rows) {
      const domande = await this.getDomandeByQuizId(row.id);
      quizList.push(new Quiz(row.tutorial_id, domande, row.id));
    }

    return quizList;
  }

  // Metodo per ottenere un quiz specifico per ID
  public async getQuizById(id: number): Promise<Quiz | null> {
    const [rows] = await this.db.query("SELECT * FROM quiz WHERE id = ?", [id]);
    if (rows.length > 0) {
      const row = rows[0];
      const domande = await this.getDomandeByQuizId(row.id);
      return new Quiz(row.tutorial_id, domande, row.id);
    }
    return null;
  }

  // Metodo per ottenere tutte le domande associate a un quiz
  private async getDomandeByQuizId(quizId: number): Promise<Domanda[]> {
    const [rows] = await this.db.query(
      "SELECT * FROM domanda WHERE quiz_id = ?",
      [quizId],
    );
    const domande: Domanda[] = [];

    for (const row of rows) {
      const risposte = await this.getRisposteByDomandaId(row.id);
      domande.push(new Domanda(row.quiz_id, row.domanda, risposte, row.id));
    }

    return domande;
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

  // Metodo per creare un nuovo quiz
  public async createQuiz(quiz: Quiz): Promise<void> {
    const { getTutorialId } = quiz;
    const [result] = await this.db.query(
      "INSERT INTO quiz (tutorial_id) VALUES (?)",
      [getTutorialId()],
    );
    const insertedId = (result as any).insertId;
    quiz.setId(insertedId);
  }

  // Metodo per aggiornare un quiz esistente
  public async updateQuiz(quiz: Quiz): Promise<void> {
    const { getId, getTutorialId } = quiz;
    if (getId() === undefined) {
      throw new Error("Quiz ID is required for updating.");
    }
    await this.db.query("UPDATE quiz SET tutorial_id = ? WHERE id = ?", [
      getTutorialId(),
      getId(),
    ]);
  }

  // Metodo per eliminare un quiz
  public async deleteQuiz(id: number): Promise<void> {
    await this.db.query("DELETE FROM quiz WHERE id = ?", [id]);
  }
}
