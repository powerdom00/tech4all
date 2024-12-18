import { Utente } from "../entity/gestione_autenticazione/Utente";
import { UtenteDao } from "../dao/UtenteDao";

export class LoginService {
  async login(email: string, password: string): Promise<{ success: boolean; user?: Utente; message?: string }> {
    try {
      if (!email || !password) {
        return { success: false, message: "Username e password sono obbligatori." };
      }

      const utenteDao = new UtenteDao();
      const user: Utente | null = await utenteDao.getUtenteByEmail(email);

      if (!user) {
        return { success: false, message: "Utente non trovato." };
      }

      if (user.getPassword() !== password) {
        return { success: false, message: "Password errata." };
      }

      return { success: true, user };
    } catch (error) {
      console.error("Errore durante il login:", error);
      return { success: false, message: "Errore interno del server. Riprova più tardi." };
    }
  }
}
