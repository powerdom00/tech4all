import { Quiz } from "./Quiz";
import { Utente } from "../gestione_autenticazione/Utente";

/**
 * Represents a Svolgimento entity.
 */
export class Svolgimento {
	/**
	 * The Quiz entity associated with the svolgimento.
	 */
	private quiz: quiz;
	/**
	 * The Utente entity associated with the svolgimento.
	 */
	private utente: utente;
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
	constructor(quiz: quiz, utente: utente, esito: boolean) {
		this.quiz = quiz;
		this.utente = utente;
		this.esito = esito;
	}

	// Getter
	/**
	 * Gets the Quiz entity associated with the svolgimento.
	 */
	public getQuiz(): quiz {
		return this.quiz;
	}

	/**
	 * Gets the Utente entity associated with the svolgimento.
	 */
	public getUtente(): utente {
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
	public setQuiz(value: quiz) {
		this.quiz = value;
	}

	/**
	 * Sets the Utente entity associated with the svolgimento.
	 */
	public setUtente(value: utente) {
		this.utente = value;
	}

	/**
	 * Sets the outcome of the svolgimento.
	 */
	public setEsito(value: boolean) {
		this.esito = value;
	}
}
