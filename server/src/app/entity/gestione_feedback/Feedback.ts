/**
 * Represents a Feedback entity.
 */
export class feedback {
  /**
   * The unique identifier of the feedback.
   */
  private _id?: number;

  /**
   * The rating given in the feedback.
   */
  private _valutazione: number;

  /**
   * The comment provided in the feedback.
   */
  private _commento: string;

  /**
   * The unique identifier of the user who provided the feedback.
   */
  private _utenteId: number;

  /**
   * The unique identifier of the tutorial associated with the feedback.
   */
  private _tutorialId: number;

  /**
   * Creates an instance of Feedback.
   * @param id - The unique identifier of the feedback.
   * @param valutazione - The rating given in the feedback.
   * @param commento - The comment provided in the feedback.
   * @param utenteId - The unique identifier of the user who provided the feedback.
   * @param tutorialId - The unique identifier of the tutorial associated with the feedback.
   */
  constructor(
    valutazione: number,
    commento: string,
    utenteId: number,
    tutorialId: number,
    id?: number,
  ) {
    this._valutazione = valutazione;
    this._commento = commento;
    this._utenteId = utenteId;
    this._tutorialId = tutorialId;
    this._id = id;
  }

  /**
   * Gets the unique identifier of the feedback.
   */
  public get id(): number | undefined {
    return this._id;
  }

  /**
   * Sets the unique identifier of the feedback.
   */
  public set id(value: number | undefined) {
    this._id = value;
  }

  /**
   * Gets the rating given in the feedback.
   */
  public get valutazione(): number {
    return this._valutazione;
  }

  /**
   * Sets the rating given in the feedback.
   */
  public set valutazione(value: number) {
    this._valutazione = value;
  }

  /**
   * Gets the comment provided in the feedback.
   */
  public get commento(): string {
    return this._commento;
  }

  /**
   * Sets the comment provided in the feedback.
   */
  public set commento(value: string) {
    this._commento = value;
  }

  /**
   * Gets the unique identifier of the user who provided the feedback.
   */
  public get utenteId(): number {
    return this._utenteId;
  }

  /**
   * Sets the unique identifier of the user who provided the feedback.
   */
  public set utenteId(value: number) {
    this._utenteId = value;
  }

  /**
   * Gets the unique identifier of the tutorial associated with the feedback.
   */
  public get tutorialId(): number {
    return this._tutorialId;
  }

  /**
   * Sets the unique identifier of the tutorial associated with the feedback.
   */
  public set tutorialId(value: number) {
    this._tutorialId = value;
  }
}
