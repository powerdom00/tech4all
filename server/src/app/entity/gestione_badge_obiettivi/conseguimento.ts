class Conseguimento {
    private utenteId: number;
    private obiettivoNome: string;
    private dataConseguimento: Date;

    constructor(utenteId: number, obiettivoNome: string, dataConseguimento: Date) {
        this.utenteId = utenteId;
        this.obiettivoNome = obiettivoNome;
        this.dataConseguimento = dataConseguimento;
    }

    public getUtenteId(): number {
        return this.utenteId;
    }

    public setUtenteId(utenteId: number): void {
        this.utenteId = utenteId;
    }

    public getObiettivoNome(): string {
        return this.obiettivoNome;
    }

    public setObiettivoNome(obiettivoNome: string): void {
        this.obiettivoNome = obiettivoNome;
    }

    public getDataConseguimento(): Date {
        return this.dataConseguimento;
    }

    public setDataConseguimento(dataConseguimento: Date): void {
        this.dataConseguimento = dataConseguimento;
    }
}
