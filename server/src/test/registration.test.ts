import { AutenticazioneService } from "../app/services/AutenticazioneService";
import { UtenteDao } from "../app/dao/UtenteDao";
import { Utente } from "../app/entity/gestione_autenticazione/Utente";

jest.mock("../app/dao/UtenteDao");

describe("AutenticazioneService - Test registrazione", () => {
  let autenticazioneService: AutenticazioneService;
  let mockUtenteDao: jest.Mocked<UtenteDao>;

  beforeEach(() => {
    mockUtenteDao = new UtenteDao() as jest.Mocked<UtenteDao>;
    autenticazioneService = new AutenticazioneService();
    // Override della dipendenza privata per il test
    // @ts-ignore
    autenticazioneService["utenteDao"] = mockUtenteDao;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("TC Email già registrata", async () => {
    // Arrange
    const existingUser = new Utente(1, "test@example.com", "Password1!", "Nome", "Cognome", false, 0);
    mockUtenteDao.getUtenteByEmail.mockResolvedValueOnce(existingUser);

    // Act
    const result = await autenticazioneService.registraUtente("test@example.com", "Password1!", "Nome", "Cognome");

    // Assert
    expect(mockUtenteDao.getUtenteByEmail).toHaveBeenCalledWith("test@example.com");
    expect(result).toEqual({
      success: false,
      message: "Email già in uso.",
    });
  });

  it("TC Formato password non valido", async () => {
    // Act
    const result = await autenticazioneService.registraUtente("test@example.com", "pass", "Nome", "Cognome");

    // Assert
    expect(result).toEqual({
      success: false,
      message: "La password deve contenere almeno 8 caratteri, una lettera maiuscola, un numero e un carattere speciale.",
    });
  });

  it("TC Nome non valido", async () => {
    // Act
    const result = await autenticazioneService.registraUtente("test@example.com", "Password1!", "A", "Cognome");

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il nome fornito non è valido.",
    });
  });

  it("TC Cognome non valido", async () => {
    // Act
    const result = await autenticazioneService.registraUtente("test@example.com", "Password1!", "Nome", "B");

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Il cognome fornito non è valido.",
    });
  });

  it("TC Formato email non valido", async () => {
    // Act
    const result = await autenticazioneService.registraUtente("invalid-email", "Password1!", "Nome", "Cognome");

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Formato email non valido.",
    });
  });

  it("TC Registrazione completata", async () => {
    // Arrange
    const newUser = new Utente(undefined, "test@example.com", "Password1!", "Nome", "Cognome", false, 0);
    mockUtenteDao.getUtenteByEmail.mockResolvedValueOnce(null);
    mockUtenteDao.createUtente.mockResolvedValueOnce();

    // Act
    const result = await autenticazioneService.registraUtente(
      "test@example.com",
      "Password1!",
      "Nome",
      "Cognome"
    );

    // Assert
    expect(mockUtenteDao.getUtenteByEmail).toHaveBeenCalledWith("test@example.com");
    expect(mockUtenteDao.createUtente).toHaveBeenCalledWith(newUser);
    expect(result).toEqual({
      success: true,
      message: "Registrazione completata con successo.",
    });
  });
});