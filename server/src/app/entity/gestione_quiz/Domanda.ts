import { Risposta } from "./Risposta";

/**
 * Represents a Domanda entity.
 */
export class Domanda {
  /**
   * The unique identifier of the domanda.
   */
  private _id?: number;

  /**
   * The identifier of the quiz associated with the domanda.
   */
  private _quizId: number;

  /**
   * The text of the domanda.
   */
  private _domanda: string;

  /**
   * lista di risposte alla domanda.
   */
  private _risposte: risposta[];  
  /**
   * Creates an instance of Domanda.
   * @param quizId - The identifier of the quiz associated with the domanda.
   * @param domanda - The text of the domanda.
   * @param id - The unique identifier of the domanda.
   * @param risposte - The list of answers to the question.
   */
  constructor(quizId: number, domanda: string, risposte: risposta[], id?: number) {
    this._quizId = quizId;
    this._domanda = domanda;
    this._id = id;
    this._risposte = risposte;
  }

  /**
   * Gets the unique identifier of the domanda.
   */
  public getid(): number | undefined {
    return this._id;
  }

  /**
   * Sets the unique identifier of the domanda.
   */
  public setid(value: number | undefined) {
    this._id = value;
  }

  /**
   * Gets the identifier of the quiz associated with the domanda.
   */
  public getquizId(): number {
    return this._quizId;
  }

  /**
   * Sets the identifier of the quiz associated with the domanda.
   */
  public setquizId(value: number) {
    this._quizId = value;
  }

  /**
   * Gets the text of the domanda.
   */
  public getdomanda(): string {
    return this._domanda;
  }

  /**
   * Sets the text of the domanda.
   */
  public setdomanda(value: string) {
    this._domanda = value;
  }

  public setRisposte(value: risposta[]) {
    this._risposte = value;
  }   

  public getRisposte(): risposta[] {
    return this._risposte;
  } 
}
