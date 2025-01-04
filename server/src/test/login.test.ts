import { AutenticazioneService } from "../app/services/AutenticazioneService";
import { UtenteDao } from "../app/dao/UtenteDao";
import { Utente } from "../app/entity/gestione_autenticazione/Utente";

jest.mock("../app/dao/UtenteDao");

describe("AutenticazioneService - Test login", () => {
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

  it("TC Email o password mancanti", async () => {
    const result = await autenticazioneService.login("", "");
    expect(result).toEqual({
      success: false,
      message: "Email e password sono obbligatori.",
    });
  });

  it("TC Formato email non valido", async () => {
    const result = await autenticazioneService.login(
      "invalid-email",
      "Password1!",
    );
    expect(result).toEqual({
      success: false,
      message: "Formato email non valido.",
    });
  });

  it("TC Lunghezza email non valida", async () => {
    const result = await autenticazioneService.login(
      "thisisaverylongemailaddress@example.com",
      "Password1!",
    );
    expect(result).toEqual({
      success: false,
      message: "Lunghezza email non valida.",
    });
  });

  it("TC Formato password non valido", async () => {
    const result = await autenticazioneService.login(
      "test@example.com",
      "short",
    );
    expect(result).toEqual({
      success: false,
      message: "Formato password non valido.",
    });
  });

  it("TC Password troppo lunga", async () => {
    const result = await autenticazioneService.login(
      "test@example.com",
      "ThisPasswordIsWayTooLong!",
    );
    expect(result).toEqual({
      success: false,
      message: "Formato password non valido.",
    });
  });

  it("TC Utente non trovato", async () => {
    mockUtenteDao.getUtenteByEmail.mockResolvedValueOnce(null);
    const result = await autenticazioneService.login(
      "nonexistent@example.com",
      "Password1!",
    );
    expect(mockUtenteDao.getUtenteByEmail).toHaveBeenCalledWith(
      "nonexistent@example.com",
    );
    expect(result).toEqual({
      success: false,
      message: "Utente non trovato.",
    });
  });

  it("TC Errore interno del server", async () => {
    // Arrange
    mockUtenteDao.getUtenteByEmail.mockRejectedValueOnce(
      new Error("Errore del database"),
    );

    // Act
    const result = await autenticazioneService.login(
      "test@example.com",
      "Password1!",
    );

    // Assert
    expect(result).toEqual({
      success: false,
      message: "Errore interno del server. Riprova più tardi.",
    });
  });

  it("TC Login completato con successo", async () => {
    const existingUser = new Utente(
      1,
      "test@example.com",
      "Password1!",
      "Nome",
      "Cognome",
      false,
      0,
    );
    mockUtenteDao.getUtenteByEmail.mockResolvedValueOnce(existingUser);

    const result = await autenticazioneService.login(
      "test@example.com",
      "Password1!",
    );
    expect(mockUtenteDao.getUtenteByEmail).toHaveBeenCalledWith(
      "test@example.com",
    );
    expect(result).toEqual({
      success: true,
      user: existingUser,
    });
  });

  it("TC Errore interno del server", async () => {
    mockUtenteDao.getUtenteByEmail.mockRejectedValueOnce(
      new Error("Errore del database"),
    );

    const result = await autenticazioneService.login(
      "test@example.com",
      "Password1!",
    );
    expect(result).toEqual({
      success: false,
      message: "Errore interno del server. Riprova più tardi.",
    });
  });
});
