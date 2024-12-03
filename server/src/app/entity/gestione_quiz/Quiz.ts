/**
 * Represents a Quiz entity.
 */
export class Quiz {
    /**
     * The unique identifier of the quiz.
     */
    private _id?: number;

    /**
     * The identifier of the tutorial associated with the quiz.
     */
    private _tutorialId: number;

    /**
     * Creates an instance of Quiz.
     * @param tutorialId - The identifier of the tutorial associated with the quiz.
     * @param id - The unique identifier of the quiz.
     */
    constructor(tutorialId: number, id?: number) {
        this._tutorialId = tutorialId;
        this._id = id;
    }

    /**
     * Gets the unique identifier of the quiz.
     */
    public get Id(): number | undefined {
        return this._id;
    }

    /**
     * Sets the unique identifier of the quiz.
     */
    public set Id(value: number | undefined) {
        this._id = value;
    }

    /**
     * Gets the identifier of the tutorial associated with the quiz.
     */
    public get TutorialId(): number {
        return this._tutorialId;
    }

    /**
     * Sets the identifier of the tutorial associated with the quiz.
     */
    public set TutorialId(value: number) {
        this._tutorialId = value;
    }
}