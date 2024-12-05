export class Utente {
	private id!: number | undefined;
	private email: string;
	private password: string;
	private nome: string;
	private cognome: string;
	private ruolo: boolean;

	constructor(
		email: string,
		password: string,
		nome: string,
		cognome: string,
		ruolo: boolean
	) {
		this.email = email;
		this.password = password;
		this.nome = nome;
		this.cognome = cognome;
		this.ruolo = ruolo;
	}

	// Getters
	public getId(): number | undefined {
		return this.id;
	}

	public getEmail(): string {
		return this.email;
	}

	public getPassword(): string {
		return this.password;
	}

	public getNome(): string {
		return this.nome;
	}

	public getCognome(): string {
		return this.cognome;
	}

	public getRuolo(): boolean {
		return this.ruolo;
	}

	// Setters
	public setEmail(value: string) {
		this.email = value;
	}

	public setPassword(value: string) {
		this.password = value;
	}

	public setNome(value: string) {
		this.nome = value;
	}

	public setCognome(value: string) {
		this.cognome = value;
	}

	public setRuolo(value: boolean) {
		this.ruolo = value;
	}
}
