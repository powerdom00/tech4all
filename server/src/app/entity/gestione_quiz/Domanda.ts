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
     * Creates an instance of Domanda.
     * @param quizId - The identifier of the quiz associated with the domanda.
     * @param domanda - The text of the domanda.
     * @param id - The unique identifier of the domanda.
     */
    constructor(quizId: number, domanda: string, id?: number) {
        this._quizId = quizId;
        this._domanda = domanda;
        this._id = id;
    }

    /**
     * Gets the unique identifier of the domanda.
     */
    public get id(): number | undefined {
        return this._id;
    }

    /**
     * Sets the unique identifier of the domanda.
     */
    public set id(value: number | undefined) {
        this._id = value;
    }

    /**
     * Gets the identifier of the quiz associated with the domanda.
     */
    public get quizId(): number {
        return this._quizId;
    }

    /**
     * Sets the identifier of the quiz associated with the domanda.
     */
    public set quizId(value: number) {
        this._quizId = value;
    }

    /**
     * Gets the text of the domanda.
     */
    public get domanda(): string {
        return this._domanda;
    }

    /**
     * Sets the text of the domanda.
     */
    public set domanda(value: string) {
        this._domanda = value;
    }
}