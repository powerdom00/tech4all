// Importazione delle entità e dei DAO
import { Utente } from "../entity/gestione_autenticazione/Utente";
import { UtenteDao } from "../dao/UtenteDao";

export class RegistrazioneService {
  async registraUtente(
    email: string,
    password: string,
    nome: string,
    cognome: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!email || !password || !nome || !cognome) {
        return {
          success: false,
          message: "Tutti i campi sono obbligatori.",
        };
      }

      const utenteDao = new UtenteDao();
      const utenteEsistente = await utenteDao.getUtenteByEmail(email);
      if (utenteEsistente) {
        return {
          success: false,
          message: "Email già in uso.",
        };
      }

      const ruolo = false; // Predefinito come booleano per "utente"

      const nuovoUtente = new Utente(email, password, nome, cognome, ruolo);
      await utenteDao.createUtente(nuovoUtente);

      return {
        success: true,
        message: "Registrazione completata con successo.",
      };
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      return {
        success: false,
        message: "Errore interno del server. Riprova più tardi.",
      };
    }
  }
}
