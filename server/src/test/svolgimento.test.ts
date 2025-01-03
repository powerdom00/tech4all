import { QuizService } from "../app/services/QuizService";
import { QuizDao } from "../app/dao/QuizDao";
import { DomandaDao } from "../app/dao/DomandaDao";
import { RispostaDao } from "../app/dao/RispostaDao";
import { SvolgimentoDao } from "../app/dao/SvolgimentoDao";
import { UtenteDao } from "../app/dao/UtenteDao";
import { Quiz } from "../app/entity/gestione_quiz/Quiz";
import { Domanda } from "../app/entity/gestione_quiz/Domanda";
import { Risposta } from "../app/entity/gestione_quiz/Risposta";
import { Utente } from "../app/entity/gestione_autenticazione/Utente";

jest.mock("../app/dao/QuizDao");
jest.mock("../app/dao/DomandaDao");
jest.mock("../app/dao/RispostaDao");
jest.mock("../app/dao/SvolgimentoDao");
jest.mock("../app/dao/UtenteDao");

describe("QuizService - eseguiQuiz", () => {
  let quizService: QuizService;
  let quizDaoMock: jest.Mocked<QuizDao>;
  let domandaDaoMock: jest.Mocked<DomandaDao>;
  let rispostaDaoMock: jest.Mocked<RispostaDao>;
  let svolgimentoDaoMock: jest.Mocked<SvolgimentoDao>;
  let utenteDaoMock: jest.Mocked<UtenteDao>;

  beforeEach(() => {
    quizDaoMock = new QuizDao() as jest.Mocked<QuizDao>;
    domandaDaoMock = new DomandaDao() as jest.Mocked<DomandaDao>;
    rispostaDaoMock = new RispostaDao() as jest.Mocked<RispostaDao>;
    utenteDaoMock = new UtenteDao() as jest.Mocked<UtenteDao>;
    svolgimentoDaoMock = new SvolgimentoDao(
      quizDaoMock,
      utenteDaoMock,
    ) as jest.Mocked<SvolgimentoDao>;
    quizService = new QuizService();

    // Override delle dipendenze private per il test
    // @ts-ignore
    quizService["quizDao"] = quizDaoMock;
    // @ts-ignore
    quizService["domandaDao"] = domandaDaoMock;
    // @ts-ignore
    quizService["rispostaDao"] = rispostaDaoMock;
    // @ts-ignore
    quizService["svolgimentoDao"] = svolgimentoDaoMock;
    // @ts-ignore
    quizService["utenteDao"] = utenteDaoMock;
  });

  it("should correctly execute a quiz", async () => {
    // Arrange
    const quizId = 1;
    const utenteId = 1;
    const risposteUtente = [1, 2, 3];

    const risposteArray = [
      new Risposta("Roma", true, 1, 1),
      new Risposta("Milano", false, 2, 1),
      new Risposta("Napoli", false, 3, 1),
    ];

    const domande = [
      new Domanda("Qual è la capitale d'Italia?", risposteArray, 1, 1),
    ];

    const quiz = new Quiz(1, domande);
    const utente = new Utente(
      1,
      "test@example.com",
      "Password1!",
      "Nome",
      "Cognome",
      false,
      0,
    );

    quizDaoMock.getQuizById.mockResolvedValue(quiz);
    utenteDaoMock.getUtenteById.mockResolvedValue(utente);
    svolgimentoDaoMock.createSvolgimento.mockResolvedValue();

    // Act
    const result = await quizService.eseguiQuiz(
      quizId,
      utenteId,
      risposteUtente,
    );

    // Assert
    expect(quizDaoMock.getQuizById).toHaveBeenCalledWith(quizId);
    expect(utenteDaoMock.getUtenteById).toHaveBeenCalledWith(utenteId);
    expect(svolgimentoDaoMock.createSvolgimento).toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      message: "Quiz eseguito con successo.",
      esito: true,
    });
  });
});
