import { Pool, RowDataPacket } from "mysql2/promise";
import { Utente } from "../entity/gestione_autenticazione/utente";
import pool from "../../db";

export class UtenteDao {
  private db: Pool;

  constructor() {
    this.db = pool; // Utilizza il modulo di connessione al database
  }

  // Metodo per ottenere tutti gli utenti
  public async getAllUtenti(): Promise<Utente[]> {
    const [rows] = await this.db.query<RowDataPacket[]>("SELECT * FROM utente");
    return rows.map(
      (row: RowDataPacket) =>
        new Utente(
          row.email,
          row.password,
          row.nome,
          row.cognome,
          row.ruolo === "admin",
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
    const password = utente.getPassword();
    const ruolo = utente.getRuolo();
    //Password e ruolo sono gli unici su cui verranno fatte delle modifiche
    //ruolo come di vede sotto,
    //password andremo a fare una crittografia
    const ruoloStr = ruolo ? "admin" : "utente";
    await this.db.query(
      "INSERT INTO utente (email, password, nome, cognome, ruolo) VALUES (?, ?, ?, ?, ?)",
      [
        utente.getEmail(),
        password,
        utente.getNome(),
        utente.getCognome(),
        ruoloStr,
      ],
    );
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
        row.email,
        row.password,
        row.nome,
        row.cognome,
        row.ruolo === "admin",
      );
    }
    return null;
  }
}
