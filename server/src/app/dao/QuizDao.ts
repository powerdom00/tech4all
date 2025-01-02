import { FieldPacket, Pool, RowDataPacket } from "mysql2/promise";
import { Quiz } from "../entity/gestione_quiz/Quiz";
import { Domanda } from "../entity/gestione_quiz/Domanda";
import { Risposta } from "../entity/gestione_quiz/Risposta";
import pool from "../../db";

export class QuizDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza la connessione al database
  }

  // Metodo per ottenere tutti i quiz
  public async getAllQuiz(): Promise<Quiz[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] =
      await this.db.query("SELECT * FROM quiz");
    const quizList: Quiz[] = [];

    for (const row of rows) {
      const domande = await this.getDomandeByQuizId(row.id);
      quizList.push(new Quiz(row.tutorial_id, domande, row.id));
    }

    return quizList;
  }

  // Metodo per ottenere un quiz specifico per ID
  public async getQuizById(id: number): Promise<Quiz | null> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM quiz WHERE id = ?",
      [id],
    );
    if (rows.length > 0) {
      const row = rows[0];
      const domande = await this.getDomandeByQuizId(row.id);
      return new Quiz(row.tutorial_id, domande, row.id);
    }
    return null;
  }

  // Metodo per ottenere tutte le domande associate a un quiz
  private async getDomandeByQuizId(quizId: number): Promise<Domanda[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM domanda WHERE quiz_id = ?",
      [quizId],
    );
    const domande: Domanda[] = [];

    for (const row of rows) {
      const risposte = await this.getRisposteByDomandaId(row.id);
      domande.push(new Domanda(row.domanda, risposte, row.quiz_id, row.id));
    }

    return domande;
  }

  // Metodo per ottenere tutte le risposte associate a una domanda
  private async getRisposteByDomandaId(domandaId: number): Promise<Risposta[]> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM risposta WHERE domanda_id = ?",
      [domandaId],
    );
    return rows.map(
      (row: RowDataPacket) =>
        new Risposta(row.risposta, row.corretta, row.domanda_id, row.id),
    );
  }

  // Metodo per creare un nuovo quiz
  public async createQuiz(quiz: Quiz): Promise<void> {
    const idTutorial = quiz.getTutorialId();
    const [result]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "INSERT INTO quiz (tutorial_id) VALUES (?)",
      [idTutorial],
    );
    const insertedId = (result as RowDataPacket).insertId;
    quiz.setId(insertedId);
  }

  // Metodo per aggiornare un quiz esistente
  public async updateQuiz(quiz: Quiz): Promise<void> {
    const id = quiz.getId();
    const idTutorial = quiz.getTutorialId();
    if (id === 0) {
      throw new Error("Quiz ID is required for updating.");
    }
    await this.db.query("UPDATE quiz SET tutorial_id = ? WHERE id = ?", [
      idTutorial,
      id,
    ]);
  }

  // Metodo per eliminare un quiz
  public async deleteQuiz(id: number): Promise<void> {
    await this.db.query("DELETE FROM quiz WHERE id = ?", [id]);
  }

  // Metodo per ottenere un quiz specifico per tutorial ID
  public async getQuizByTutorialId(tutorialId: number): Promise<Quiz | null> {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await this.db.query(
      "SELECT * FROM quiz WHERE tutorial_id = ?",
      [tutorialId],
    );
    if (rows.length > 0) {
      const row = rows[0];
      const domande = await this.getDomandeByQuizId(row.id);
      return new Quiz(row.tutorial_id, domande, row.id);
    }
    return null;
  }
}
