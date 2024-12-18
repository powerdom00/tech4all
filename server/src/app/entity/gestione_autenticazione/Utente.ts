export class Utente {
  private id!: number | undefined;
  private email: string;
  private password: string;
  private nome: string;
  private cognome: string;
  private ruolo: boolean;
  private quizSuperati: number = 0; // Aggiunta della variabile quizSuperati

  constructor(
    email: string,
    password: string,
    nome: string,
    cognome: string,
    ruolo: boolean,
    quizSuperati: number
  ) {
    this.email = email;
    this.password = password;
    this.nome = nome;
    this.cognome = cognome;
    this.ruolo = ruolo;
    this.quizSuperati = quizSuperati;
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

  public getRuolo(): string {
    return this.ruolo ? "admin" : "utente";
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

  public setRuolo(value: string) {
    this.ruolo = value === "admin";
  }

  // Getter e Setter per quizSuperati
  public getQuizSuperati(): number {
    return this.quizSuperati;
  }

  public setQuizSuperati(value: number) {
    this.quizSuperati = value;
  }
}
