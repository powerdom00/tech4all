import { FeedbackService } from "../app/services/FeedbackService";
import { FeedbackDao } from "../app/dao/FeedbackDao";
import { Feedback } from "../app/entity/gestione_feedback/Feedback";

// Mock delle dipendenze
jest.mock("../app/dao/FeedbackDao");
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

  it("TC UserID mancante", async () => {
    const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(
      undefined as any,
      1,
    );
    expect(result).toEqual({
      success: false,
      message: "ID utente e ID tutorial obbligatori.",
    });
  });

  it("TC TutorialID mancante", async () => {
    const result2 = await feedbackService.VisualizzaFeedbackUtenteTutorial(
      1,
      undefined as any,
    );
    expect(result2).toEqual({
      success: false,
      message: "ID utente e ID tutorial obbligatori.",
    });
  });
  it("TC Feedback non trovato", async () => {
    mockFeedbackDao.getFeedbackByUserIdAndTutorialId.mockResolvedValue(null);

    const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(1, 1);

    expect(result).toEqual({
      success: false,
      message: "Feedback non trovato.",
    });
  });

  it("TC Feedback trovato", async () => {
    const feedback = new Feedback(5, "Ottimo tutorial", 1, 1);
    mockFeedbackDao.getFeedbackByUserIdAndTutorialId.mockResolvedValue(
      feedback,
    );

    const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(1, 1);

    expect(result).toEqual({
      success: true,
      feedback: feedback,
    });
  });

  it("dovrebbe gestire gli errori in modo appropriato", async () => {
    mockFeedbackDao.getFeedbackByUserIdAndTutorialId.mockRejectedValue(
      new Error("Errore del database"),
    );

    const result = await feedbackService.VisualizzaFeedbackUtenteTutorial(1, 1);

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
