import axios from "axios";

export class UserController {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Metodo per registrare un nuovo utente
  async registerUser(
    nome: string,
    cognome: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/register`, {
        nome,
        cognome,
        email,
        password,
      });
      if (response.status !== 201) {
        throw new Error(
          response.data.message || "Errore durante la registrazione."
        );
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      throw error;
    }
  }

  // Metodo per effettuare il login di un utente
  async loginUser(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, {
        email,
        password,
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Email o password errati.");
      }
      return response.data;
    } catch (error) {
      console.error("Errore durante il login:", error);
      throw error;
    }
  }

  // Metodo per ottenere gli utenti
  async getUsers(): Promise<any[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/accounts/visualizzaUtenti`
      );
      if (response.status !== 200) {
        throw new Error(
          response.data.message || "Errore durante il recupero degli utenti."
        );
      }
      return response.data.utenti;
    } catch (error) {
      console.error("Errore durante il recupero degli utenti:", error);
      throw error;
    }
  }
}
