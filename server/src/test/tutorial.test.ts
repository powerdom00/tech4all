import { TutorialService } from "../app/services/TutorialService";
import { TutorialDao } from "../app/dao/TutorialDao";
import { Tutorial } from "../app/entity/gestione_tutorial/Tutorial";
import { Categoria } from "../app/entity/gestione_tutorial/Categoria";

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
      "uploads/resized-1735384807365-grafica.png",
      "Il cloud computing è una tecnologia che ha rivoluzionato il modo in cui accediamo e utilizziamo risorse digitali. [...]",
      Categoria.Categoria_1,
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
      "!@#Titolo123", // Titolo con caratteri non validi
      "uploads/resized-1735384807365-grafica.png",
      "Il cloud computing è una tecnologia che ha rivoluzionato il modo in cui accediamo e utilizziamo risorse digitali. [...]",
      Categoria.Categoria_1,
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
      "uploads/resized-1735384807365-grafica.png",
      "Il cloud computing è una tecnologia che ha rivoluzionato il modo in cui accediamo e utilizziamo risorse digitali. [...]",
      Categoria.Categoria_1,
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithLongTitle,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il titolo deve essere tra 1 e 100 caratteri.",
    });
  });

  it("TC Lunghezza testo non valida maggiore (oltre 65.535 caratteri)", async () => {
    // Arrange
    const longText = "A".repeat(65536); // Testo con più di 65.535 caratteri
    const tutorialWithExcessiveText = new Tutorial(
      "Come Funziona il Cloud Computing: Un'introduzione per Principianti",
      "uploads/resized-1735384807365-grafica.png",
      longText,
      Categoria.Categoria_1,
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithExcessiveText,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il testo deve essere tra 20 e 65.535 caratteri.",
    });
  });

  it("TC Lunghezza testo non valida minore", async () => {
    // Arrange
    const shortText = "A".repeat(19);
    const tutorialWithShortText = new Tutorial(
      "Come Funziona il Cloud Computing: Un'introduzione per Principianti",
      "uploads/resized-1735384807365-grafica.png",
      shortText, //Testo troppo corto
      Categoria.Categoria_1,
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithShortText,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il testo deve essere tra 20 e 65.535 caratteri.",
    });
  });

  it("TC Caricamento grafica con formato non supportato", async () => {
    // Arrange
    const tutorialWithUnsupportedImageFormat = new Tutorial(
      "Come Funziona il Cloud Computing: Un'introduzione per Principianti",
      "uploads/resized-1735384807365-foto_tut.tiff", // Formato grafica non supportato
      "Il cloud computing è una tecnologia che ha rivoluzionato il modo in cui accediamo e utilizziamo risorse digitali. [...]",
      Categoria.Categoria_1,
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithUnsupportedImageFormat,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message:
        "Il formato della foto non è valido. Sono ammessi solo i formati png, jpg, jpeg, webp.",
    });
  });

  it("TC Errore selezione categoria I", async () => {
    // Arrange
    const tutorialWithInvalidCategory = new Tutorial(
      "Come Funziona il Cloud Computing: Un'introduzione per Principianti",
      "uploads/resized-1735384807365-foto.jpeg",
      "Il cloud computing è una tecnologia che ha rivoluzionato il modo in cui accediamo e utilizziamo risorse digitali. [...]",
      "Casuale", // Categoria non valida
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithInvalidCategory,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "La categoria inserita non è valida.",
    });
  });

  it("TC Errore selezione categoria II", async () => {
    // Arrange
    const tutorialWithInvalidCategory = new Tutorial(
      "Come Funziona il Cloud Computing: Un'introduzione per Principianti",
      "uploads/resized-1735384807365-foto.jpeg",
      "Il cloud computing è una tecnologia che ha rivoluzionato il modo in cui accediamo e utilizziamo risorse digitali. [...]",
      "Categoria_Casuale_con_più_di_cinquanta_lettere_quindi_non_è_inseribile_in_questo_campo", // Categoria non valida
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithInvalidCategory,
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "La categoria inserita non è valida.",
    });
  });

  it("TC Creazione tutorial completata", async () => {
    // Arrange
    const newTutorial = new Tutorial(
      "Come Funziona il Cloud Computing: Un'introduzione per Principianti",
      "uploads/resized-1735384807365-foto.jpeg",
      "Il cloud computing è una tecnologia che ha rivoluzionato il modo in cui accediamo e utilizziamo risorse digitali. [...]",
      Categoria.Categoria_1,
    );
    mockTutorialDao.createTutorial.mockResolvedValueOnce();

    // Act
    const result = await tutorialService.creazioneTutorial(newTutorial);

    // Assert
    expect(mockTutorialDao.createTutorial).toHaveBeenCalledWith(newTutorial);
    expect(result).toEqual({
      success: true,
      message: "Tutorial creato con successo.",
    });
  });
});
