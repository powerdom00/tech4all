// Importazione delle entità e dei DAO
import { Utente } from "../entity/gestione_autenticazione/Utente";
import { UtenteDao } from "../dao/UtenteDao";
export class LoginService {
  /**
   * Metodo per gestire il login dell'utente.
   * @param username - Nome utente inserito.
   * @param password - Password inserita.
   * @returns Una promessa che risolve un oggetto con informazioni sull'utente o un messaggio di errore.
   */
  async login(
    username: string,
    password: string,
  ): Promise<{ success: boolean; user?: Utente; message?: string }> {
    try {
      // Validazione input
      if (!username || !password) {
        return {
          success: false,
          message: "Username e password sono obbligatori.",
        };
      }

      // Creazione di un'istanza del DAO
      const utenteDao = new UtenteDao();

      // Recupera l'utente dal database tramite il DAO
      const user: Utente | null = await utenteDao.getUtenteByEmail(username);

      // Controllo dell'esistenza dell'utente
      if (!user) {
        return {
          success: false,
          message: "Utente non trovato.",
        };
      }

      // Verifica della password
      if (user.getPassword() !== password) {
        return {
          success: false,
          message: "Password errata.",
        };
      }

      // Login riuscito
      return {
        success: true,
        user: user,
      };
    } catch (error) {
      console.error("Errore durante il login:", error);
      return {
        success: false,
        message: "Errore interno del server. Riprova più tardi.",
      };
    }
  }
}
