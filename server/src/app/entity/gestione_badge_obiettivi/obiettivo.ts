export class Obiettivo {
  private nome: string;
  private descrizione: string;
  private graficaBadge: string;
  private quizDaSuperare: number;
  private categoriaQuiz: string;

  constructor(
    nome: string,
    descrizione: string,
    graficaBadge: string,
    quizDaSuperare: number,
    categoriaQuiz: string,
  ) {
    this.nome = nome;
    this.descrizione = descrizione;
    this.graficaBadge = graficaBadge;
    this.quizDaSuperare = quizDaSuperare;
    this.categoriaQuiz = categoriaQuiz;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getDescrizione(): string {
    return this.descrizione;
  }

  public setDescrizione(descrizione: string): void {
    this.descrizione = descrizione;
  }

  public getGraficaBadge(): string {
    return this.graficaBadge;
  }

  public setGraficaBadge(graficaBadge: string): void {
    this.graficaBadge = graficaBadge;
  }

  public getQuizDaSuperare(): number {
    return this.quizDaSuperare;
  }

  public setQuizDaSuperare(quizDaSuperare: number): void {
    this.quizDaSuperare = quizDaSuperare;
  }

  public getCategoriaQuiz(): string {
    return this.categoriaQuiz;
  }

  public setCategoriaQuiz(categoriaQuiz: string): void {
    this.categoriaQuiz = categoriaQuiz;
  }
}
