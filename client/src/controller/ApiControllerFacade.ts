import { TutorialController } from "./TutorialController";
import { QuizController } from "./QuizController";
import { FeedbackController } from "./FeedbackController";
import { UserController } from "./UserController";
import { Tutorial } from "@/interfacce/Tutorial";
import { Domanda, Risposta } from "@/interfacce/Quiz";
import { Feedback } from "@/interfacce/Feedback";

class ApiControllerFacade {
  private tutorialController: TutorialController;
  private quizController: QuizController;
  private feedbackController: FeedbackController;
  private userController: UserController;

  constructor(baseUrl: string) {
    this.tutorialController = new TutorialController(baseUrl);
    this.quizController = new QuizController(baseUrl);
    this.feedbackController = new FeedbackController(baseUrl);
    this.userController = new UserController(baseUrl);
  }

  // Metodi per interagire con il TutorialController
  async getTutorials(): Promise<Tutorial[]> {
    return this.tutorialController.getTutorials();
  }

  async getTutorialById(id: number): Promise<Tutorial> {
    return this.tutorialController.getTutorialById(id);
  }

  async createTutorial(formData: FormData): Promise<void> {
    return this.tutorialController.createTutorial(formData);
  }

  async deleteTutorial(id: number): Promise<void> {
    return this.tutorialController.deleteTutorial(id);
  }

  // Metodi per interagire con il QuizController
  async checkQuizExists(
    tutorialId: number,
  ): Promise<{ exists: boolean; quizId: number | null }> {
    return this.quizController.checkQuizExists(tutorialId);
  }

  async getQuizByTutorialId(
    tutorialId: number,
  ): Promise<{ domande: Domanda[]; risposte: Risposta[] }> {
    return this.quizController.getQuizByTutorialId(tutorialId);
  }

  async createQuiz(
    tutorialId: number,
    nuoveDomande: { domanda: string; risposte: string[]; corretta: number }[],
  ): Promise<void> {
    return this.quizController.createQuiz(tutorialId, nuoveDomande);
  }

  async deleteQuiz(
    id: number,
  ): Promise<{ success: boolean; message?: string }> {
    return this.quizController.deleteQuiz(id);
  }

  async executeQuiz(
    quizId: number,
    risposteUtente: number[],
    utenteId: number,
  ): Promise<{ success: boolean; message?: string }> {
    return this.quizController.executeQuiz(quizId, risposteUtente, utenteId);
  }

  // Metodi per interagire con il FeedbackController
  async createFeedback(
    valutazione: number,
    commento: string,
    utenteId: number,
    tutorialId: number,
  ): Promise<void> {
    return this.feedbackController.createFeedback(
      valutazione,
      commento,
      utenteId,
      tutorialId,
    );
  }

  async deleteFeedback(
    utenteId: number,
    tutorialId: number,
  ): Promise<{ success: boolean; message?: string }> {
    return this.feedbackController.deleteFeedback(utenteId, tutorialId);
  }

  async getFeedbackByTutorialId(tutorialId: number): Promise<Feedback[]> {
    return this.feedbackController.getFeedbackByTutorialId(tutorialId);
  }

  async getFeedbackByUserId(utenteId: number): Promise<Feedback[]> {
    return this.feedbackController.getFeedbackByUserId(utenteId);
  }

  // Metodi per interagire con lo UserController
  async registerUser(
    nome: string,
    cognome: string,
    email: string,
    password: string,
  ): Promise<void> {
    return this.userController.registerUser(nome, cognome, email, password);
  }

  async loginUser(email: string, password: string): Promise<any> {
    return this.userController.loginUser(email, password);
  }

  async getUsers(): Promise<any[]> {
    return this.userController.getUsers();
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return this.userController.checkEmailExists(email);
  }
}

export default new ApiControllerFacade("http://localhost:5000");
