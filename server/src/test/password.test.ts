import { AutenticazioneService } from "../app/services/AutenticazioneService";
import { Utente } from "../app/entity/gestione_autenticazione/Utente";
import { UtenteDao } from "../app/dao/UtenteDao";

describe("AutenticazioneService - login", () => {
  let autenticazioneService: AutenticazioneService;
  let utenteDaoMock: jest.Mocked<UtenteDao>;

  beforeEach(() => {
    utenteDaoMock = {
      getUtenteByEmail: jest.fn(),
    } as unknown as jest.Mocked<UtenteDao>;

    autenticazioneService = new AutenticazioneService();
    // Override della dipendenza privata per il test
    // @ts-ignore
    autenticazioneService["utenteDao"] = utenteDaoMock;
  });

  it("dovrebbe restituire un messaggio di errore se la password non è corretta", async () => {
    // Mock dell'utente esistente
    const mockUser = new Utente(
      1,
      "test@example.com",
      "Password1!",
      "Nome",
      "Cognome",
      false,
      0,
    );
    utenteDaoMock.getUtenteByEmail.mockResolvedValue(mockUser);

    // Esegui il login con password errata
    const result = await autenticazioneService.login(
      "test@example.com",
      "PassWrong1!",
    );

    // Verifica del risultato
    expect(result).toEqual({
      success: false,
      message: "Password errata.",
    });

    expect(utenteDaoMock.getUtenteByEmail).toHaveBeenCalledWith(
      "test@example.com",
    );
  });
});
