export class Obiettivo {
  private nome: string;
  private descrizione: string;
  private graficaBadge: string;
  private quizDaSuperare: number;

  constructor(
    nome: string,
    descrizione: string,
    graficaBadge: string,
    quizDaSuperare: number,
  ) {
    this.nome = nome;
    this.descrizione = descrizione;
    this.graficaBadge = graficaBadge;
    this.quizDaSuperare = quizDaSuperare;
  }

  // Getter
  public getNome(): string {
    return this.nome;
  }

  public getDescrizione(): string {
    return this.descrizione;
  }

  public getGraficaBadge(): string {
    return this.graficaBadge;
  }

  public getQuizDaSuperare(): number {
    return this.quizDaSuperare;
  }

  // Setter
  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setDescrizione(descrizione: string): void {
    this.descrizione = descrizione;
  }

  public setGraficaBadge(graficaBadge: string): void {
    this.graficaBadge = graficaBadge;
  }

  public setQuizDaSuperare(quizDaSuperare: number): void {
    this.quizDaSuperare = quizDaSuperare;
  }
}
