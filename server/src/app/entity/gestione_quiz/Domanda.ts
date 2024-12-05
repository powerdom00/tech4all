import { Risposta } from "./Risposta";

/**
 * Represents a Domanda entity.
 */
export class Domanda {
  /**
   * The unique identifier of the domanda.
   */
  private id?: number;
  /**
   * The identifier of the quiz associated with the domanda.
   */
  private quizId: number;
  /**
   * The text of the domanda.
   */
  private domanda: string;
  /**
   * lista di risposte alla domanda.
   */
  private risposte: Risposta[];

  /**
   * Creates an instance of Domanda.
   * @param quizId - The identifier of the quiz associated with the domanda.
   * @param domanda - The text of the domanda.
   * @param id - The unique identifier of the domanda.
   * @param risposte - The list of answers to the question.
   */
  constructor(
    quizId: number,
    domanda: string,
    risposte: Risposta[],
    id?: number,
  ) {
    this.quizId = quizId;
    this.domanda = domanda;
    this.id = id;
    this.risposte = risposte;
  }

  // Getter
  /**
   * Gets the unique identifier of the domanda.
   */
  public getId(): number | undefined {
    return this.id;
  }

  /**
   * Gets the identifier of the quiz associated with the domanda.
   */
  public getQuizId(): number {
    return this.quizId;
  }

  /**
   * Gets the text of the domanda.
   */
  public getDomanda(): string {
    return this.domanda;
  }

  public getRisposte(): Risposta[] {
    return this.risposte;
  }

  // Setter
  /**
   * Sets the unique identifier of the domanda.
   */
  public setId(value: number | undefined) {
    this.id = value;
  }

  /**
   * Sets the identifier of the quiz associated with the domanda.
   */
  public setQuizId(value: number) {
    this.quizId = value;
  }

  /**
   * Sets the text of the domanda.
   */
  public setDomanda(value: string) {
    this.domanda = value;
  }

  public setRisposte(value: Risposta[]) {
    this.risposte = value;
  }
}
