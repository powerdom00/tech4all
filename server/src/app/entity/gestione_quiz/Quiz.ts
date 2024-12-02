class Quiz {
    private id: number;
    private tutorialId: number;

    constructor(id: number, tutorialId: number) {
        this.id = id;
        this.tutorialId = tutorialId;
    }

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get TutorialId(): number {
        return this.tutorialId;
    }

    set TutorialId(value: number) {
        this.tutorialId = value;
    }
}