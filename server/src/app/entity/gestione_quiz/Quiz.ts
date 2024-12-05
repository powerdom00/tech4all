import { domanda } from "./domanda";
import { risposta } from "./risposta";

/**
 * Represents a Quiz entity.
 */
export class quiz {
  /**
   * The unique identifier of the quiz.
   */
  private _id?: number;

  /**
   * The identifier of the tutorial associated with the quiz.
   */
  private _tutorialId: number;
    /**
   * The list of questions in the quiz.
   */
    private _domande: domanda[];



  /**
   * Creates an instance of Quiz.
   * @param tutorialId - The identifier of the tutorial associated with the quiz.
   * @param id - The unique identifier of the quiz.
   * @param domande - The list of questions in the quiz.
   * @param risposte - The list of answers in the quiz. 
   */
  constructor(tutorialId: number,domande: domanda[], id?: number) {    
    this._tutorialId = tutorialId;
    this._id = id;
    this._domande = domande; 
  
  }

  /**
   * Gets the unique identifier of the quiz.
   */
  public getId(): number | undefined {
    return this._id;
  }

  /**
   * Sets the unique identifier of the quiz.
   */
  public setId(value: number | undefined) {
    this._id = value;
  }

  /**
   * Gets the identifier of the tutorial associated with the quiz.
   */
  public getTutorialId(): number {
    return this._tutorialId;
  }

  /**
   * Sets the identifier of the tutorial associated with the quiz.
   */
  public setTutorialId(value: number) {
    this._tutorialId = value;
  }

  
  public getDomande(): domanda[] {
    return this._domande;
  }

  /**
   * Sets the list of questions in the quiz.
   */
  public setDomande(value: domanda[]) {
    this._domande = value;
  }


}
