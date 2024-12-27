import { Pool, RowDataPacket } from "mysql2/promise";
import { Utente } from "../entity/gestione_autenticazione/Utente";
import pool from "../../db";

export class UtenteDao {
  private db: Pool;
  static updateUtente: (utente: Utente) => Promise<void>;

  constructor() {
    this.db = pool; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutti gli utenti
  public async getAllUtenti(): Promise<Utente[]> {
    const [rows] = await this.db.query<RowDataPacket[]>("SELECT * FROM utente");
    return rows.map(
      (row: RowDataPacket) =>
        new Utente(
          row.id,
          row.email,
          row.password,
          row.nome,
          row.cognome,
          row.ruolo === "admin", // Converte la stringa in booleano
          row.quiz_superati, // Include quizSuperati dal risultato della query
        ),
    );
  }

  // Metodo per ottenere un utente specifico per email
  public async getUtenteByEmail(email: string): Promise<Utente | null> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      "SELECT * FROM utente WHERE email = ?",
      [email],
    );
    if (rows.length > 0) {
      const row = rows[0];
      return new Utente(
        row.id,
        row.email,
        row.password,
        row.nome,
        row.cognome,
        row.ruolo === "admin", // Converte la stringa in booleano
        row.quiz_superati, // Include quizSuperati dal risultato della query
      );
    }
    return null;
  }

  // Metodo per creare un nuovo utente
  public async createUtente(utente: Utente): Promise<void> {
    await this.db.query(
      "INSERT INTO utente (email, password, nome, cognome, ruolo, quiz_superati) VALUES (?, ?, ?, ?, ?, ?)",
      [
        utente.getEmail(),
        utente.getPassword(),
        utente.getNome(),
        utente.getCognome(),
        utente.getRuolo(), // Il getter converte in "utente" o "admin"
        utente.getQuizSuperati(), // Include quizSuperati dal valore dell'oggetto utente
      ],
    );
  }

  // Metodo per aggiornare il numero di quiz superati
  public async updateQuizSuperati(utente: Utente): Promise<void> {
    if (utente.getId() === undefined) {
      throw new Error("ID dell'utente non definito");
    }

    // Verifica che l'utente esista
    const [rows] = await this.db.query<RowDataPacket[]>(
      "SELECT * FROM utente WHERE id = ?",
      [utente.getId()],
    );

    if (rows.length === 0) {
      throw new Error("Utente non trovato");
    }

    // Esegui l'update
    await this.db.query("UPDATE utente SET quiz_superati = ? WHERE id = ?", [
      utente.getQuizSuperati(),
      utente.getId(),
    ]);
  }

  //metodo per trovare l'utente tramite l'id, usato per ora in SolvigemtoDao
  public async getUtenteById(id: number): Promise<Utente | null> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      "SELECT * FROM utente WHERE id = ?",
      [id],
    );
    if (rows.length > 0) {
      const row = rows[0];
      return new Utente(
        row.id,
        row.email,
        row.password,
        row.nome,
        row.cognome,
        row.ruolo === "admin", // Converte la stringa in booleano
        row.quiz_superati, // Include quizSuperati dal risultato della query
      );
    }
    return null;
  }
}
