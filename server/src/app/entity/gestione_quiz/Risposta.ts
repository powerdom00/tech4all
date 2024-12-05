/**
 * Represents a Risposta entity.
 */
export class risposta {
  /**
   * The unique identifier of the risposta.
   */
  private _id?: number;

  /**
   * The identifier of the domanda associated with the risposta.
   */
  private _domandaId: number;

  /**
   * The text of the risposta.
   */
  private _risposta: string;

  /**
   * Indicates whether the risposta is correct.
   */
  private _corretta: boolean;

  /**
   * Creates an instance of Risposta.
   * @param domandaId - The identifier of the domanda associated with the risposta.
   * @param risposta - The text of the risposta.
   * @param corretta - Indicates whether the risposta is correct.
   * @param id - The unique identifier of the risposta.
   */
  constructor(
    domandaId: number,
    risposta: string,
    corretta: boolean,
    id?: number,
  ) {
    this._domandaId = domandaId;
    this._risposta = risposta;
    this._corretta = corretta;
    this._id = id;
  }

  /**
   * Gets the unique identifier of the risposta.
   */
  public get id(): number | undefined {
    return this._id;
  }

  /**
   * Sets the unique identifier of the risposta.
   */
  public set id(value: number | undefined) {
    this._id = value;
  }

  /**
   * Gets the identifier of the domanda associated with the risposta.
   */
  public get domandaId(): number {
    return this._domandaId;
  }

  /**
   * Sets the identifier of the domanda associated with the risposta.
   */
  public set domandaId(value: number) {
    this._domandaId = value;
  }

  /**
   * Gets the text of the risposta.
   */
  public get risposta(): string {
    return this._risposta;
  }

  /**
   * Sets the text of the risposta.
   */
  public set risposta(value: string) {
    this._risposta = value;
  }

  /**
   * Gets whether the risposta is correct.
   */
  public get corretta(): boolean {
    return this._corretta;
  }

  /**
   * Sets whether the risposta is correct.
   */
  public set corretta(value: boolean) {
    this._corretta = value;
  }
}
