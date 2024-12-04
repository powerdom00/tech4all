export class Utente {
  private _id!: number | undefined;

  private _email: string;

  private _password: string;

  private _nome: string;

  private _cognome: string;

  private _ruolo: boolean;

  constructor(
    email: string,
    password: string,
    nome: string,
    cognome: string,
    ruolo: boolean,
  ) {
    this._email = email;
    this._password = password;
    this._nome = nome;
    this._cognome = cognome;
    this._ruolo = ruolo;
  }

  // Getters
  get id(): number | undefined {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get nome(): string {
    return this._nome;
  }

  get cognome(): string {
    return this._cognome;
  }

  get ruolo(): boolean {
    return this._ruolo;
  }

  // Setters
  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set nome(value: string) {
    this._nome = value;
  }

  set cognome(value: string) {
    this._cognome = value;
  }

  set ruolo(value: boolean) {
    this._ruolo = value;
  }

  // toString method
  toString(): string {
    return `Utente { id: ${this._id}, email: ${this._email}, nome: ${this._nome}, cognome: ${this._cognome}, ruolo: ${this._ruolo} }`;
  }
}
