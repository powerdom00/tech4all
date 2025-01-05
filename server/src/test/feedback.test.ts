import { FeedbackService } from "../app/services/FeedbackService";
import { FeedbackDao } from "../app/dao/FeedbackDao";
import { Feedback } from "../app/entity/gestione_feedback/Feedback";

// Mock delle dipendenze
jest.mock("../app/dao/FeedbackDao");

describe("FeedbackService - Recensione vuota", () => {
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
  describe("FeedbackService - VisualizzaFeedbackUtenteTutorial", () => {
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

    it("dovrebbe restituire un errore se userId è mancante", async () => {
      const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(
        undefined as any,
        1,
      );
      expect(result).toEqual({
        success: false,
        message: "ID utente e ID tutorial obbligatori.",
      });
    });

    it("dovrebbe restituire un errore se tutorialId è mancante", async () => {
      const result2 = await feedbackService.VisualizzaFeedbackUtenteTutorial(
        1,
        undefined as any,
      );
      expect(result2).toEqual({
        success: false,
        message: "ID utente e ID tutorial obbligatori.",
      });
    });
    it("dovrebbe restituire un errore se il feedback non viene trovato", async () => {
      mockFeedbackDao.getFeedbackByUserIdAndTutorialId.mockResolvedValue(null);

      const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(
        1,
        1,
      );

      expect(result).toEqual({
        success: false,
        message: "Feedback non trovato.",
      });
    });

    it("dovrebbe restituire il feedback se trovato", async () => {
      const feedback = new Feedback(5, "Ottimo tutorial", 1, 1);
      mockFeedbackDao.getFeedbackByUserIdAndTutorialId.mockResolvedValue(
        feedback,
      );

      const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(
        1,
        1,
      );

      expect(result).toEqual({
        success: true,
        feedback: feedback,
      });
    });

    it("dovrebbe gestire gli errori in modo appropriato", async () => {
      mockFeedbackDao.getFeedbackByUserIdAndTutorialId.mockRejectedValue(
        new Error("Errore del database"),
      );

      const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(
        1,
        1,
      );

      expect(result).toEqual({
        success: false,
        message: "Errore durante la visualizzazione del feedback.",
      });
    });
  });

  describe("FeedbackService - VisualizzaFeedbackTutorial", () => {
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

    it("dovrebbe restituire un errore se tutorialId è mancante", async () => {
      const result = await feedbackService.VisualizzaFeedbackTutorial(
        undefined as any,
      );
      expect(result).toEqual({
        success: false,
        message: "ID tutorial obbligatorio.",
      });
    });

    it("dovrebbe restituire un errore se il feedback non viene trovato", async () => {
      const result = await feedbackService.VisualizzaFeedbackTutorial(1);

      expect(result).toEqual({
        success: false,
        message: "Feedback non trovato.",
      });
    });

    it("dovrebbe restituire il feedback se trovato", async () => {
      const feedback = [
        new Feedback(5, "Ottimo tutorial", 1, 1),
        new Feedback(4, "Buon tutorial", 2, 1),
      ];
      mockFeedbackDao.getFeedbackByTutorialId.mockResolvedValue(feedback);

      const result = await feedbackService.VisualizzaFeedbackTutorial(1);

      expect(result).toEqual({
        success: true,
        Feedback: feedback,
      });
    });

    it("dovrebbe gestire gli errori in modo appropriato", async () => {
      mockFeedbackDao.getFeedbackByTutorialId.mockRejectedValue(
        new Error("Errore del database"),
      );

      const result = await feedbackService.VisualizzaFeedbackTutorial(1);

      expect(result).toEqual({
        success: false,
        message: "Errore durante la visualizzazione del feedback.",
      });
    });
  });

  describe("FeedbackService - VisualizzaFeedbackUtente", () => {
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
  
    it("dovrebbe restituire un errore se userId è mancante", async () => {
      const result = await feedbackService.VisualizzaFeedbackUtente(
        undefined as any,
      );
      expect(result).toEqual({
        success: false,
        message: "ID utente obbligatorio.",
      });
    });
  
    it("dovrebbe restituire un errore se il feedback non viene trovato", async () => {  
      const result = await feedbackService.VisualizzaFeedbackUtente(1);
      expect(result).toEqual({
        success: false,
        message: "Feedback non trovato.",
      });
    });
  
    it("dovrebbe restituire il feedback se trovato", async () => {
      const feedback = [
        new Feedback(5, "Ottimo tutorial", 1, 1),
        new Feedback(4, "Buon tutorial", 2, 1),
      ];
      mockFeedbackDao.getFeedbackByUserId.mockResolvedValue(feedback);
  
      const result = await feedbackService.VisualizzaFeedbackUtente(1);
  
      expect(result).toEqual({
        success: true,
        Feedback: feedback,
      });
    });
  
    it("dovrebbe gestire gli errori in modo appropriato", async () => {
      mockFeedbackDao.getFeedbackByUserId.mockRejectedValue(
        new Error("Errore del database"),
      );
  
      const result = await feedbackService.VisualizzaFeedbackUtente(1);
  
      expect(result).toEqual({
        success: false,
        message: "Errore durante la visualizzazione del feedback.",
      });
    });
  });


});
