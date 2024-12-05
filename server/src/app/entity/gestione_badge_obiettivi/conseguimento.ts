export class Conseguimento {
	private utenteId: number;
	private obiettivoNome: string;
	private dataConseguimento: Date;

	constructor(
		utenteId: number,
		obiettivoNome: string,
		dataConseguimento: Date
	) {
		this.utenteId = utenteId;
		this.obiettivoNome = obiettivoNome;
		this.dataConseguimento = dataConseguimento;
	}

	// Getter
	public getUtenteId(): number {
		return this.utenteId;
	}

	public getObiettivoNome(): string {
		return this.obiettivoNome;
	}

	public getDataConseguimento(): Date {
		return this.dataConseguimento;
	}

	// Setter
	public setUtenteId(utenteId: number): void {
		this.utenteId = utenteId;
	}

	public setObiettivoNome(obiettivoNome: string): void {
		this.obiettivoNome = obiettivoNome;
	}

	public setDataConseguimento(dataConseguimento: Date): void {
		this.dataConseguimento = dataConseguimento;
	}
}
