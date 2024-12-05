import { quiz } from "./Quiz";
import { utente } from "../gestione_autenticazione/Utente";

/**
 * Represents a Svolgimento entity.
 */
export class Svolgimento {
  /**
   * The Quiz entity associated with the svolgimento.
   */
  private _quiz: quiz;

  /**
   * The Utente entity associated with the svolgimento.
   */
  private _utente: utente;

  /**
   * The outcome of the svolgimento.
   */
  private _esito: boolean;

  /**
   * Creates an instance of Svolgimento.
   * @param quiz - The Quiz entity associated with the svolgimento.
   * @param utente - The Utente entity associated with the svolgimento.
   * @param esito - The outcome of the svolgimento.
   */
  constructor(quiz: quiz, utente: utente, esito: boolean) {
    this._quiz = quiz;
    this._utente = utente;
    this._esito = esito;
  }

  /**
   * Gets the Quiz entity associated with the svolgimento.
   */
  public get quiz(): quiz {
    return this._quiz;
  }

  /**
   * Sets the Quiz entity associated with the svolgimento.
   */
  public set quiz(value: quiz) {
    this._quiz = value;
  }

  /**
   * Gets the Utente entity associated with the svolgimento.
   */
  public get utente(): utente {
    return this._utente;
  }

  /**
   * Sets the Utente entity associated with the svolgimento.
   */
  public set utente(value: utente) {
    this._utente = value;
  }

  /**
   * Gets the outcome of the svolgimento.
   */
  public get esito(): boolean {
    return this._esito;
  }

  /**
   * Sets the outcome of the svolgimento.
   */
  public set esito(value: boolean) {
    this._esito = value;
  }
}
