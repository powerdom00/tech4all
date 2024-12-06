import { Pool } from "mysql2/promise";
import { Obiettivo } from "../entity/gestione_badge_obiettivi/Obiettivo";
import pool from "../../db";

export class ObiettivoDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutti gli obiettivi
  public async getAllObiettivi(): Promise<Obiettivo[]> {
    const [rows] = await this.db.query("SELECT * FROM obiettivo");
    return rows.map(
      (row: any) =>
        new Obiettivo(
          row.nome,
          row.descrizione,
          row.grafica_badge,
          row.quiz_da_superare,
        ),
    );
  }

  // Metodo per ottenere un obiettivo specifico per nome
  public async getObiettivo(nome: string): Promise<Obiettivo | null> {
    const [rows] = await this.db.query(
      "SELECT * FROM obiettivo WHERE nome = ?",
      [nome],
    );
    if (rows.length > 0) {
      const row = rows[0];
      return new Obiettivo(
        row.nome,
        row.descrizione,
        row.grafica_badge,
        row.quiz_da_superare,
      );
    }
    return null;
  }

  // Metodo per creare un nuovo obiettivo
  public async createObiettivo(obiettivo: Obiettivo): Promise<void> {
    const { getNome, getDescrizione, getGraficaBadge, getQuizDaSuperare } =
      obiettivo;
    await this.db.query(
      "INSERT INTO obiettivo (nome, descrizione, grafica_badge, quiz_da_superare) VALUES (?, ?, ?, ?)",
      [getNome(), getDescrizione(), getGraficaBadge(), getQuizDaSuperare()],
    );
  }

  // Metodo per aggiornare un obiettivo esistente
  public async updateObiettivo(obiettivo: Obiettivo): Promise<void> {
    const { getNome, getDescrizione, getGraficaBadge, getQuizDaSuperare } =
      obiettivo;
    await this.db.query(
      "UPDATE obiettivo SET descrizione = ?, grafica_badge = ?, quiz_da_superare = ? WHERE nome = ?",
      [getDescrizione(), getGraficaBadge(), getQuizDaSuperare(), getNome()],
    );
  }

  // Metodo per eliminare un obiettivo per nome
  public async deleteObiettivo(nome: string): Promise<void> {
    await this.db.query("DELETE FROM obiettivo WHERE nome = ?", [nome]);
  }
}
