import { FeedbackService } from "../app/services/FeedbackService";
import { FeedbackDao } from "../app/dao/FeedbackDao";
import { Feedback } from "../app/entity/gestione_feedback/Feedback";

// Mock delle dipendenze
jest.mock("../app/dao/FeedbackDao");

describe("FeedbackService - Creazione Feedback", () => {
  let feedbackService: FeedbackService;
  let mockFeedbackDao: jest.Mocked<FeedbackDao>;

  beforeEach(() => {
    mockFeedbackDao = new FeedbackDao() as jest.Mocked<FeedbackDao>;
    feedbackService = new FeedbackService();
    // Override della dipendenza privata per il test
    // @ts-ignore
    feedbackService["FeedbackDao"] = mockFeedbackDao;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("TC Recensione vuota", async () => {
    // Arrange
    const valutazione = 2;
    const commento = ""; // Recensione vuota
    const userId = 1;
    const tutorialId = 1;

    // Act
    const result = await feedbackService.creaFeedback(
      valutazione,
      commento,
      userId,
      tutorialId,
    );

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe(
      "Valutazione, commento, ID utente e ID tutorial obbligatori.",
    );
    expect(mockFeedbackDao.createFeedback).not.toHaveBeenCalled();
  });

  it("TC Voto assente", async () => {
    // Arrange
    const valutazione = 0; // Voto assente
    const commento = "Bello questo tutorial";
    const userId = 1;
    const tutorialId = 1;

    // Act
    const result = await feedbackService.creaFeedback(
      valutazione,
      commento,
      userId,
      tutorialId,
    );

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe(
      "Valutazione, commento, ID utente e ID tutorial obbligatori.",
    );
    expect(mockFeedbackDao.createFeedback).not.toHaveBeenCalled();
  });

  it("TC Lunghezza recensione troppo corta", async () => {
    // Arrange
    const valutazione = 2;
    const commento = "K"; // Recensione troppo corta
    const userId = 1;
    const tutorialId = 1;

    // Act
    const result = await feedbackService.creaFeedback(
      valutazione,
      commento,
      userId,
      tutorialId,
    );

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Lunghezza recensione tra 2 e 500 caratteri.");
    expect(mockFeedbackDao.createFeedback).not.toHaveBeenCalled();
  });

  it("TC Lunghezza recensione troppo lunga", async () => {
    // Arrange
    const valutazione = 2;
    const commento = "K".repeat(501); // Recensione troppo lunga
    const userId = 1;
    const tutorialId = 1;

    // Act
    const result = await feedbackService.creaFeedback(
      valutazione,
      commento,
      userId,
      tutorialId,
    );

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Lunghezza recensione tra 2 e 500 caratteri.");
    expect(mockFeedbackDao.createFeedback).not.toHaveBeenCalled();
  });

  it("TC Feedback esistente", async () => {
    // Arrange
    const valutazione = 2;
    const commento = "Questo tutorial ci sta."; // Feedback esistente
    const userId = 1;
    const tutorialId = 1;

    // Mock per simulare un feedback esistente
    mockFeedbackDao.getFeedbackByUserIdAndTutorialId.mockResolvedValue(
      new Feedback(valutazione, commento, userId, tutorialId),
    );

    // Act
    const result = await feedbackService.creaFeedback(
      valutazione,
      commento,
      userId,
      tutorialId,
    );

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Feedback già inserito per questo tutorial.");
    expect(mockFeedbackDao.createFeedback).not.toHaveBeenCalled();
  });

  it("TC Feedback completato", async () => {
    // Arrange
    const valutazione = 2;
    const commento = "Questo tutorial ci sta."; // Recensione valida
    const userId = 1;
    const tutorialId = 1;

    // Act
    const result = await feedbackService.creaFeedback(
      valutazione,
      commento,
      userId,
      tutorialId,
    );

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Feedback creato con successo.");
    expect(mockFeedbackDao.createFeedback).toHaveBeenCalledWith(
      expect.objectContaining({
        valutazione: 2,
        commento: "Questo tutorial ci sta.",
        utenteId: 1,
        tutorialId: 1,
      }),
    );
  });
});
