// Importazione delle entità e dei DAO
import { Utente } from "../entity/gestione_autenticazione/Utente";
import { UtenteDao } from "../dao/UtenteDao";

export class AccountService {
  private utenteDao: UtenteDao;

  constructor() {
    this.utenteDao = new UtenteDao();
  }

  /**
   * Metodo per visualizzare i dati dell'utente.
   * @param userId - ID dell'utente.
   * @returns Una promessa che risolve un oggetto con i dati dell'utente o un messaggio di errore.
   */
  async visualizzaDati(userId: number): Promise<{ success: boolean; utente?: Utente; message?: string }> {
    try {
      if (!userId) {
        return {
          success: false,
          message: "ID utente obbligatorio.",
        };
      }

      const utente = await this.utenteDao.getUtenteById(userId);
      if (!utente) {
        return {
          success: false,
          message: "Utente non trovato.",
        };
      }

      return {
        success: true,
        utente: utente,
      };
    } catch (error) {
      console.error("Errore durante la visualizzazione dei dati:", error);
      return {
        success: false,
        message: "Errore interno del server. Riprova più tardi.",
      };
    }
  }
}

