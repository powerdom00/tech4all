// tech4all/client/src/ApiFacade.ts
import axios from "axios";
import { Tutorial } from "../interfacce/Tutorial";

class ApiFacade {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Metodo per ottenere i tutorial
  async getTutorials(): Promise<Tutorial[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/tutorial`);
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero dei tutorial:", error);
      throw error;
    }
  }

  // Metodo per ottenere un tutorial specifico
  async getTutorialById(id: number): Promise<Tutorial> {
    try {
      const response = await axios.get(`${this.baseUrl}/tutorial/${id}`);
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero del tutorial:", error);
      throw error;
    }
  }

  // Metodo per creare un nuovo tutorial
  async createTutorial(tutorial: Tutorial): Promise<Tutorial> {
    try {
      const response = await axios.post(`${this.baseUrl}/tutorials`, tutorial);
      return response.data;
    } catch (error) {
      console.error("Errore durante la creazione del tutorial:", error);
      throw error;
    }
  }

  // Metodo per eliminare un tutorial
  async deleteTutorial(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${this.baseUrl}/tutorials/${id}`);
      return response.data;
    } catch (error) {
      console.error("Errore durante l'eliminazione del tutorial:", error);
      throw error;
    }
  }
}

export default new ApiFacade("http://localhost:5000/tutorials");
