import { AccountService } from "../app/services/AccountService";
import { UtenteDao } from "../app/dao/UtenteDao";
import { Utente } from "../app/entity/gestione_autenticazione/Utente";

jest.mock("../app/dao/UtenteDao");

describe("AccountService - visualizzaDati", () => {
  let accountService: AccountService;
  let utenteDaoMock: jest.Mocked<UtenteDao>;

  beforeEach(() => {
    utenteDaoMock = new UtenteDao() as jest.Mocked<UtenteDao>;
    accountService = new AccountService();

    // Override della dipendenza privata per il test
    // @ts-ignore
    accountService["utenteDao"] = utenteDaoMock;
  });

  it("Dovrebbe mostrare i dati dell'utente se l'utente esiste", async () => {
    // Arrange
    const userId = 1;
    const utente = new Utente(
      1,
      "test@example.com",
      "Password1!",
      "Nome",
      "Cognome",
      false,
      0,
    );
    utenteDaoMock.getUtenteById.mockResolvedValue(utente);

    // Act
    const result = await accountService.visualizzaDati(userId);

    // Assert
    expect(utenteDaoMock.getUtenteById).toHaveBeenCalledWith(userId);
    expect(result).toEqual({
      success: true,
      utente: utente,
    });
  });

  it("Dovrebbe restituire un messaggio d'errore se l'utente non esiste", async () => {
    // Arrange
    const userId = 1;
    utenteDaoMock.getUtenteById.mockResolvedValue(null);

    // Act
    const result = await accountService.visualizzaDati(userId);

    // Assert
    expect(utenteDaoMock.getUtenteById).toHaveBeenCalledWith(userId);
    expect(result).toEqual({
      success: false,
      message: "Utente non trovato.",
    });
  });

  it("Dovrebbe restituire un messaggio d'errore se non viene dato nessun id utente", async () => {
    // Arrange
    const userId = 0;

    // Act
    const result = await accountService.visualizzaDati(userId);

    // Assert
    expect(result).toEqual({
      success: false,
      message: "ID utente obbligatorio.",
    });
  });
});

describe("AccountService - visualizzaUtenti", () => {
  let accountService: AccountService;
  let utenteDaoMock: jest.Mocked<UtenteDao>;

  beforeEach(() => {
    utenteDaoMock = new UtenteDao() as jest.Mocked<UtenteDao>;
    accountService = new AccountService();

    // Override della dipendenza privata per il test
    // @ts-ignore
    accountService["utenteDao"] = utenteDaoMock;
  });

  it("Restituisce tutti gli utenti se gli utenti esistono", async () => {
    // Arrange
    const utenti = [
      new Utente(
        1,
        "test1@example.com",
        "Password1!",
        "Nome1",
        "Cognome1",
        false,
        0,
      ),
      new Utente(
        2,
        "test2@example.com",
        "Password2!",
        "Nome2",
        "Cognome2",
        false,
        0,
      ),
    ];
    utenteDaoMock.getAllUtenti.mockResolvedValue(utenti);

    // Act
    const result = await accountService.visualizzaUtenti();

    // Assert
    expect(utenteDaoMock.getAllUtenti).toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      utenti: utenti,
    });
  });

  it("dovrebbe restituire un messaggio quando viene scatenata un'eccezione", async () => {
    // Arrange
    utenteDaoMock.getAllUtenti.mockRejectedValue(new Error("Database error"));

    // Act
    const result = await accountService.visualizzaUtenti();

    // Assert
    expect(utenteDaoMock.getAllUtenti).toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
      message: "Errore interno del server. Riprova più tardi.",
    });
  });
});
