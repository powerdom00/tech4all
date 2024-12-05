/**
 * Represents a Risposta entity.
 */
export class Risposta {
	/**
	 * The unique identifier of the risposta.
	 */
	private id?: number;
	/**
	 * The identifier of the domanda associated with the risposta.
	 */
	private domandaId: number;
	/**
	 * The text of the risposta.
	 */
	private risposta: string;
	/**
	 * Indicates whether the risposta is correct.
	 */
	private corretta: boolean;

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
		id?: number
	) {
		this.domandaId = domandaId;
		this.risposta = risposta;
		this.corretta = corretta;
		this.id = id;
	}

	// Getter
	/**
	 * Gets the unique identifier of the risposta.
	 */
	public getId(): number | undefined {
		return this.id;
	}

	/**
	 * Gets the identifier of the domanda associated with the risposta.
	 */
	public getDomandaId(): number {
		return this.domandaId;
	}

	/**
	 * Gets the text of the risposta.
	 */
	public getRisposta(): string {
		return this.risposta;
	}

	/**
	 * Gets whether the risposta is correct.
	 */
	public getCorretta(): boolean {
		return this.corretta;
	}

	// Setter
	/**
	 * Sets the unique identifier of the risposta.
	 */
	public setId(value: number | undefined) {
		this.id = value;
	}

	/**
	 * Sets the identifier of the domanda associated with the risposta.
	 */
	public setDomandaId(value: number) {
		this.domandaId = value;
	}

	/**
	 * Sets the text of the risposta.
	 */
	public setRisposta(value: string) {
		this.risposta = value;
	}

	/**
	 * Sets whether the risposta is correct.
	 */
	public setCorretta(value: boolean) {
		this.corretta = value;
	}
}
