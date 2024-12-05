import { Pool } from "mysql2/promise";
import { Utente } from "./Utente";
import db from "./db"; // Importa il file di connessione al database

export class UtenteDao {
  private db: Pool;

  constructor() {
    this.db = db; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutti gli utenti
  public async getAllUtenti(): Promise<Utente[]> {
    const [rows] = await this.db.query("SELECT * FROM utente");
    return rows.map(
      (row: any) =>
        new Utente(
          row.email,
          row.password,
          row.nome,
          row.cognome,
          row.ruolo === "admin",
        ),
    );
  }

  // Metodo per ottenere un utente per email
  public async getUtenteByEmail(email: string): Promise<Utente | null> {
    const [rows] = await this.db.query("SELECT * FROM utente WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      const row = rows[0];
      return new Utente(
        row.email,
        row.password,
        row.nome,
        row.cognome,
        row.ruolo === "admin",
      );
    }
    return null;
  }

  // Metodo per creare un nuovo utente
  public async createUtente(utente: Utente): Promise<void> {
    const { email, password, nome, cognome, ruolo } = utente;
    const ruoloStr = ruolo ? "admin" : "utente";
    await this.db.query(
      "INSERT INTO utente (email, password, nome, cognome, ruolo) VALUES (?, ?, ?, ?, ?)",
      [email, password, nome, cognome, ruoloStr],
    );
  }

  // Metodo per aggiornare un utente esistente
  public async updateUtente(utente: Utente): Promise<void> {
    const { getId, getEmail, getPassword, getNome, getCognome, getRuolo } =
      utente;
    if (getId() !== undefined) {
      const ruoloStr = getRuolo() ? "admin" : "utente";
      await this.db.query(
        "UPDATE utente SET email = ?, password = ?, nome = ?, cognome = ?, ruolo = ? WHERE id = ?",
        [getEmail(), getPassword(), getNome(), getCognome(), ruoloStr, getId()],
      );
    } else {
      throw new Error("Impossibile aggiornare l'utente: ID non valido");
    }
  }

  // Metodo per eliminare un utente per ID
  public async deleteUtenteById(id: number): Promise<void> {
    await this.db.query("DELETE FROM utente WHERE id = ?", [id]);
  }
}
