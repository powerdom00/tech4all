import { TutorialService } from "../app/services/TutorialService";
import { TutorialDao } from "../app/dao/TutorialDao";
import { Tutorial } from "../app/entity/gestione_tutorial/Tutorial";
import { Categoria } from "../app/entity/gestione_tutorial/Categoria";

// Mock delle dipendenze
jest.mock("../app/dao/TutorialDao");

describe("TutorialService - Test creazioneTutorial", () => {
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

  it("TC Lunghezza titolo invalida", async () => {
    // Arrange
    const tutorialWithLongTitle = new Tutorial(
      "Questo è un titolo estremamente lungo che supera i 100 caratteri e che non dovrebbe essere accettato dal sistema per la creazione del tutorial.", // Titolo con più di 100 caratteri
      "grafica.png",
      "In questa guida, ti mostreremo come utilizzare i principali social media, come Facebook, Twitter e Instagram, in modo efficace e sicuro. [...]",
      Categoria.SOCIAL_MEDIA
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithLongTitle
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il titolo deve avere tra i 5 e i 100 caratteri.",
    });
  });

  it("TC Formato del titolo non corretto", async () => {
    // Arrange
    const tutorialWithInvalidTitleFormat = new Tutorial(
      "Titolo@@@non-valido!!",
      "grafica.png",
      "In questa guida, ti mostreremo come utilizzare i principali social media, come Facebook, Twitter e Instagram, in modo efficace e sicuro. [...]",
      Categoria.SOCIAL_MEDIA
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithInvalidTitleFormat
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il titolo contiene caratteri non validi.",
    });
  });

  it("TC Formato della grafica non corretto", async () => {
    // Arrange
    const tutorialWithUnsupportedImageFormat = new Tutorial(
      "Utilizzare i social media",
      "grafica.pdf",
      "In questa guida, ti mostreremo come utilizzare i principali social media, come Facebook, Twitter e Instagram, in modo efficace e sicuro. [...]",
      Categoria.SOCIAL_MEDIA
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithUnsupportedImageFormat
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message:
        "Il formato della foto non è valido. Sono ammessi solo i formati png, jpg, jpeg, webp.",
    });
  });

  it("TC Lunghezza testo invalida", async () => {
    // Arrange
    const longText = "A".repeat(65536); // Testo con più di 65.535 caratteri
    const tutorialWithExcessiveText = new Tutorial(
      "Utilizzare i social media",
      "grafica.png",
      longText,
      Categoria.SOCIAL_MEDIA
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithExcessiveText
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il testo deve avere tra i 20 e i 65.535 caratteri.",
    });
  });

  it("TC Lunghezza della categoria invalida", async () => {
    // Arrange
    const tutorialWithInvalidCategory = new Tutorial(
      "Utilizzare i social media",
      "grafica.png",
      "In questa guida, ti mostreremo come utilizzare i principali social media, come Facebook, Twitter e Instagram, in modo efficace e sicuro. [...]",
      "SM"
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithInvalidCategory
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message:
        "La lunghezza della categoria deve essere tra i 5 e i 50 caratteri.",
    });
  });

  it("TC Categoria non trovata", async () => {
    // Arrange
    const tutorialWithInvalidCategory = new Tutorial(
      "Utilizzare i social media",
      "grafica.png",
      "In questa guida, ti mostreremo come utilizzare i principali social media, come Facebook, Twitter e Instagram, in modo efficace e sicuro. [...]",
      "CategoriaInesistente"
    );

    // Act
    const result = await tutorialService.creazioneTutorial(
      tutorialWithInvalidCategory
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message:
        "La categoria inserita non è valida. Le categorie valide sono: Internet, Social Media, Tecnologia, Sicurezza.",
    });
  });

  it("TC Creazione tutorial completata", async () => {
    // Arrange
    const newTutorial = new Tutorial(
      "Utilizzare i social media",
      "grafica.png",
      "In questa guida, ti mostreremo come utilizzare i principali social media, come Facebook, Twitter e Instagram, in modo efficace e sicuro. [...]",
      Categoria.SOCIAL_MEDIA
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

describe("TutorialService - Test filtroTutorial", () => {
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

  it("TC Filtro tutorial per categoria", async () => {
    // Arrange
    const categoria = Categoria.INTERNET;
    const tutorials = [
      new Tutorial(
        "Titolo 1",
        "uploads/resized-1735384807365-grafica1.png",
        "Testo del tutorial 1",
        categoria
      ),
      new Tutorial(
        "Titolo 2",
        "uploads/resized-1735384807365-grafica2.png",
        "Testo del tutorial 2",
        categoria
      ),
    ];
    mockTutorialDao.getTutorialsByCategoria.mockResolvedValueOnce(tutorials);

    // Act
    const result = await tutorialService.filtroTutorial(categoria);

    // Assert
    expect(mockTutorialDao.getTutorialsByCategoria).toHaveBeenCalledWith(
      categoria
    );
    expect(result).toEqual(tutorials);
  });

  it("TC Filtro tutorial per valutazione ascendente", async () => {
    // Arrange
    const order = "asc";
    const tutorials = [
      new Tutorial(
        "Titolo 1",
        "uploads/resized-1735384807365-grafica1.png",
        "Testo del tutorial 1",
        Categoria.INTERNET,
        3
      ),
      new Tutorial(
        "Titolo 2",
        "uploads/resized-1735384807365-grafica2.png",
        "Testo del tutorial 2",
        Categoria.INTERNET,
        5
      ),
    ];
    mockTutorialDao.getTutorialsByValutazione.mockResolvedValueOnce(tutorials);

    // Act
    const result = await tutorialService.filtroTutorial(undefined, order);

    // Assert
    expect(mockTutorialDao.getTutorialsByValutazione).toHaveBeenCalledWith(
      order
    );
    expect(result).toEqual(tutorials);
  });

  it("TC Filtro tutorial senza parametri", async () => {
    // Arrange
    const tutorials = [
      new Tutorial(
        "Titolo 1",
        "uploads/resized-1735384807365-grafica1.png",
        "Testo del tutorial 1",
        Categoria.INTERNET
      ),
      new Tutorial(
        "Titolo 2",
        "uploads/resized-1735384807365-grafica2.png",
        "Testo del tutorial 2",
        Categoria.INTERNET
      ),
    ];
    mockTutorialDao.getAllTutorials.mockResolvedValueOnce(tutorials);

    // Act
    const result = await tutorialService.filtroTutorial();

    // Assert
    expect(mockTutorialDao.getAllTutorials).toHaveBeenCalled();
    expect(result).toEqual(tutorials);
  });
});
