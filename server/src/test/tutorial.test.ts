import { TutorialService } from "../app/services/TutorialService";
import { TutorialDao } from "../app/dao/TutorialDao";
import { Tutorial } from "../app/entity/gestione_tutorial/Tutorial";

// Mock delle dipendenze
jest.mock("../app/dao/TutorialDao");

describe("TutorialService - Test tutorial", () => {
  let tutorialService: TutorialService;
  let mockTutorialDao: jest.Mocked<TutorialDao>;

  beforeEach(() => {
    mockTutorialDao = new TutorialDao() as jest.Mocked<TutorialDao>;
    tutorialService = new TutorialService();
    // Override della dipendenza privata per il test
    // @ts-ignore
    tutorialService["tutorialDao"] = mockTutorialDao;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("TC Creazione tutorial con titolo vuoto", async () => {
    // Arrange
    const tutorialWithEmptyTitle = new Tutorial(
      "", // Titolo vuoto
      "https://example.com/image.jpg",
      "Questo è il contenuto del tutorial.",
      "Programmazione",
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithEmptyTitle,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il titolo del tutorial non può essere vuoto.",
    });
  });

  it("TC Formato titolo non valido", async () => {
    // Arrange
    const tutorialWithInvalidTitleFormat = new Tutorial(
      "!!@##", // Titolo con caratteri non validi
      "https://example.com/image.jpg",
      "Questo è il contenuto del tutorial.",
      "Programmazione",
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithInvalidTitleFormat,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il titolo contiene caratteri non validi.",
    });
  });

  it("TC Lunghezza titolo non valida maggiore", async () => {
    // Arrange
    const tutorialWithLongTitle = new Tutorial(
      "A".repeat(101), // Titolo con più di 100 caratteri
      "https://example.com/image.jpg",
      "Questo è il contenuto del tutorial.",
      "Programmazione",
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithLongTitle,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il titolo non può essere più lungo di 100 caratteri.",
    });
  });

  it("TC Lunghezza testo non valida maggiore", async () => {
    // Arrange
    const tutorialWithLongText = new Tutorial(
      "Tutorial valido",
      "https://example.com/image.jpg",
      "A".repeat(1001), // Testo con più di 1000 caratteri
      "Programmazione",
    );

    // Act
    const result =
      await tutorialService.creazioneTutorial(tutorialWithLongText);

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il testo non può essere più lungo di 1000 caratteri.",
    });
  });

  it("TC Lunghezza testo non valida minore", async () => {
    // Arrange
    const tutorialWithShortText = new Tutorial(
      "Tutorial valido",
      "https://example.com/image.jpg",
      "A".repeat(19), // Testo con meno di 20 caratteri
      "Programmazione",
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithShortText,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il testo deve essere lungo almeno 20 caratteri.",
    });
  });

  it("TC Creazione tutorial con titolo valido", async () => {
    // Arrange
    const validTutorial = new Tutorial(
      "Tutorial di esempio",
      "https://example.com/image.jpg",
      "Questo è il contenuto del tutorial.",
      "Programmazione",
    );
    mockTutorialDao.createTutorial.mockResolvedValueOnce();

    // Act
    const result = await tutorialService.creazioneTutorial(validTutorial);

    // Assert
    expect(mockTutorialDao.createTutorial).toHaveBeenCalledWith(validTutorial);
    expect(result).toEqual({
      success: true,
      message: "Tutorial creato con successo.",
    });
  });
});
