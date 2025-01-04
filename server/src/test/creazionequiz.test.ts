import { QuizService } from "../app/services/QuizService";
import { QuizDao } from "../app/dao/QuizDao";
import { DomandaDao } from "../app/dao/DomandaDao";
import { RispostaDao } from "../app/dao/RispostaDao";
import { Quiz } from "../app/entity/gestione_quiz/Quiz";
import { Domanda } from "../app/entity/gestione_quiz/Domanda";
import { Risposta } from "../app/entity/gestione_quiz/Risposta";

// Mock dei DAO
jest.mock("../app/dao/QuizDao");
jest.mock("../app/dao/DomandaDao");
jest.mock("../app/dao/RispostaDao");

describe("QuizService", () => {
  let quizService: QuizService;
  let quizDaoMock: QuizDao;
  let domandaDaoMock: DomandaDao;
  let rispostaDaoMock: RispostaDao;

  beforeEach(() => {
    quizDaoMock = new QuizDao() as jest.Mocked<QuizDao>;
    domandaDaoMock = new DomandaDao() as jest.Mocked<DomandaDao>;
    rispostaDaoMock = new RispostaDao() as jest.Mocked<RispostaDao>;
    quizService = new QuizService();
  });

  it("TC Lunghezza domanda non valida (corta)", async () => {
    const domanda = new Domanda("K", [
      new Risposta("Computer", true, 1),
      new Risposta("Desktop", false, 1),
      new Risposta("Tastiera", false, 1),
    ], 1);

    const quiz = new Quiz(1, [domanda], 1);

    // Spy sul metodo createQuiz per verificare che non venga chiamato
    const createQuizSpy = jest.spyOn(quizDaoMock, "createQuiz");

    const result = await quizService.creaQuiz(quiz);

    // Verifica che il quiz non venga creato
    expect(createQuizSpy).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.message).toBe("La lunghezza della domanda non è valida (minimo 2 caratteri).");
  });
    
    
    it("TC Lunghezza domanda non valida (troppo lunga)", async () => {
        const domandaTesto = "a".repeat(256); // Testo con 256 caratteri, supera il limite di 255
        const domanda = new Domanda(domandaTesto, [
        new Risposta("Computer", true, 1),
        new Risposta("Desktop", false, 1),
        new Risposta("Tastiera", false, 1),
      ], 1);

    const quiz = new Quiz(1, [domanda], 1);

    // Spy sul metodo createQuiz per verificare che non venga chiamato
    const createQuizSpy = jest.spyOn(quizDaoMock, "createQuiz");

    const result = await quizService.creaQuiz(quiz);

    // Verifica che il quiz non venga creato
    expect(createQuizSpy).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.message).toBe("La lunghezza della domanda non è valida (massimo 255 caratteri).");
    });
    
     it("TC Lunghezza risposta non valida (troppo corta)", async () => {
    const rispostaCorta = new Risposta("A", true, 1); // Risposta con meno di 2 caratteri
    const domanda = new Domanda("Qual è la periferica di input?", [
      rispostaCorta,
      new Risposta("Mouse", false, 1),
      new Risposta("Tastiera", false, 1),
    ], 1);

    const quiz = new Quiz(1, [domanda], 1);

    // Spy sul metodo createQuiz per verificare che non venga chiamato
    const createQuizSpy = jest.spyOn(quizDaoMock, "createQuiz");

    const result = await quizService.creaQuiz(quiz);

    // Verifica che il quiz non venga creato
    expect(createQuizSpy).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.message).toBe("La lunghezza della risposta non è valida (minimo 2 caratteri).");
     });
    
    it("TC Lunghezza risposta non valida (troppo lunga)", async () => {
        const rispostaLunga = new Risposta("a".repeat(256), true, 1); // Risposta con più di 255 caratteri
        const domanda = new Domanda("Qual è la periferica di input?", [
            rispostaLunga,
            new Risposta("Mouse", false, 1),
            new Risposta("Tastiera", false, 1),
        ], 1);
    const quiz = new Quiz(1, [domanda], 1);

    // Spy sul metodo createQuiz per verificare che non venga chiamato
    const createQuizSpy = jest.spyOn(quizDaoMock, "createQuiz");

    const result = await quizService.creaQuiz(quiz);

    // Verifica che il quiz non venga creato
    expect(createQuizSpy).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.message).toBe("La lunghezza della risposta non è valida (massimo 255 caratteri).");
     });

      it("TC Creazione Quiz Corretta", async () => {
    const domanda = new Domanda("Quale dispositivo serve per accedere a Internet?", [
      new Risposta("Computer", true, 1),
      new Risposta("Desktop", false, 1),
      new Risposta("Tastiera", false, 1),
    ], 1);

    const quiz = new Quiz(1, [domanda], 1);

    // Spy sul metodo createQuiz per verificare che non venga chiamato
    const createQuizSpy = jest.spyOn(quizDaoMock, "createQuiz");

    const result = await quizService.creaQuiz(quiz);

    // Verifica che il quiz non venga creato
    expect(createQuizSpy).not.toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.message).toBe("Quiz creato con successo con tutte le domande e risposte.");
  });
    
});
