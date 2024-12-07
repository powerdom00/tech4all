/* eslint-disable prettier/prettier */
import { UtenteDao } from "../app/dao/UtenteDao";
import { Utente } from "../app/entity/gestione_autenticazione/Utente";

async function testCreateUtente() {
  const utenteDao = new UtenteDao();

  // Crea un nuovo utente
  const nuovoUtente = new Utente(
    "test2@example.com",
    "password123",
    "Nome",
    "Cognome",
    false, // Non admin
  );
  try {
    // Prova a inserire il nuovo utente
    await utenteDao.createUtente(nuovoUtente);
    console.log("Utente creato con successo!");

    // Verifica se l'utente è stato inserito correttamente
    const utenteInserito = await utenteDao.getUtenteByEmail("test2@example.com");
    if (utenteInserito) {
      console.log("Utente trovato:", utenteInserito);
    } else {
      console.log("Utente non trovato.");
    }
  } catch (error) {
    console.error("Errore durante la creazione dell'utente:", error);
  }
}

testCreateUtente();
