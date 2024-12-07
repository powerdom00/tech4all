import { Quiz } from "./Quiz";
import { Utente } from "../gestione_autenticazione/utente";

/**
 * Represents a Svolgimento entity.
 */
export class Svolgimento {
  /**
   * The Quiz entity associated with the svolgimento.
   */
  private quiz: Quiz;
  /**
   * The Utente entity associated with the svolgimento.
   */
  private utente: Utente;
  /**
   * The outcome of the svolgimento.
   */
  private esito: boolean;

  /**
   * Creates an instance of Svolgimento.
   * @param quiz - The Quiz entity associated with the svolgimento.
   * @param utente - The Utente entity associated with the svolgimento.
   * @param esito - The outcome of the svolgimento.
   */
  constructor(quiz: Quiz, utente: Utente, esito: boolean) {
    this.quiz = quiz;
    this.utente = utente;
    this.esito = esito;
  }

  // Getter
  /**
   * Gets the Quiz entity associated with the svolgimento.
   */
  public getQuiz(): Quiz {
    return this.quiz;
  }

  /**
   * Gets the Utente entity associated with the svolgimento.
   */
  public getUtente(): Utente {
    return this.utente;
  }

  /**
   * Gets the outcome of the svolgimento.
   */
  public getEsito(): boolean {
    return this.esito;
  }

  // Setter
  /**
   * Sets the Quiz entity associated with the svolgimento.
   */
  public setQuiz(value: Quiz) {
    this.quiz = value;
  }

  /**
   * Sets the Utente entity associated with the svolgimento.
   */
  public setUtente(value: Utente) {
    this.utente = value;
  }

  /**
   * Sets the outcome of the svolgimento.
   */
  public setEsito(value: boolean) {
    this.esito = value;
  }
}
