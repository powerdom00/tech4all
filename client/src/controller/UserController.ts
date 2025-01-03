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
        password
      });
      console.log("Dati utente ricevuti dal backend:", response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Errore durante il login:", error.message);
        if (error.response?.status === 401) {
          error.message = "Email o password errati.";
          alert("Email o password errati.");
        } else {
          alert("Errore durante il login: " + error.message);
        }
      } else {
        console.error("Errore durante il login:", error);
        alert("Errore durante il login.");
      }
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

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/check-email`, { email });
      return response.data.exists;
    } catch (error) {
      console.error("Errore durante il controllo dell'email:", error);
      throw error;
    }
  }
}
