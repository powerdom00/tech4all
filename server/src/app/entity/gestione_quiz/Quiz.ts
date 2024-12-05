import { Domanda } from "./Domanda";
import { Risposta } from "./Risposta";

/**
 * Represents a Quiz entity.
 */
export class Quiz {
	/**
	 * The unique identifier of the quiz.
	 */
	private id?: number;
	/**
	 * The identifier of the tutorial associated with the quiz.
	 */
	private tutorialId: number;
	/**
	 * The list of questions in the quiz.
	 */
	private domande: domanda[];

	/**
	 * Creates an instance of Quiz.
	 * @param tutorialId - The identifier of the tutorial associated with the quiz.
	 * @param id - The unique identifier of the quiz.
	 * @param domande - The list of questions in the quiz.
	 * @param risposte - The list of answers in the quiz.
	 */
	constructor(tutorialId: number, domande: domanda[], id?: number) {
		this.tutorialId = tutorialId;
		this.id = id;
		this.domande = domande;
	}

	// Getter
	/**
	 * Gets the unique identifier of the quiz.
	 */
	public getId(): number | undefined {
		return this.id;
	}

	/**
	 * Gets the identifier of the tutorial associated with the quiz.
	 */
	public getTutorialId(): number {
		return this.tutorialId;
	}

	public getDomande(): domanda[] {
		return this.domande;
	}

	// Setter
	/**
	 * Sets the unique identifier of the quiz.
	 */
	public setId(value: number | undefined) {
		this.id = value;
	}

	/**
	 * Sets the identifier of the tutorial associated with the quiz.
	 */
	public setTutorialId(value: number) {
		this.tutorialId = value;
	}

	/**
	 * Sets the list of questions in the quiz.
	 */
	public setDomande(value: domanda[]) {
		this.domande = value;
	}
}
