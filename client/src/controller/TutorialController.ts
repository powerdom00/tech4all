import { Tutorial } from "@/interfacce/Tutorial";
import axios from "axios";

export class TutorialController {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/tutorials`;
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
  async createTutorial(formData: FormData): Promise<void> {
    try {
      const response = await axios.post(`${this.baseUrl}/tutorial`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Errore durante la creazione del tutorial:", error);
      throw error;
    }
  }

  // Metodo per eliminare un tutorial
  async deleteTutorial(id: number): Promise<void> {
    try {
      const response = await axios.delete(`${this.baseUrl}/tutorial/${id}`);
      return response.data;
    } catch (error) {
      console.error("Errore durante l'eliminazione del tutorial:", error);
      throw error;
    }
  }
}
