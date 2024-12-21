import { Quiz } from "./Quiz";
import { Utente } from "../gestione_autenticazione/Utente";

export class Svolgimento {
  private quiz: Quiz;
  private utente: Utente;
  private esito: boolean;
  private dataConseguimento: Date;
  private risposteEsatte: number;

  constructor(
    quiz: Quiz,
    utente: Utente,
    esito: boolean,
    dataConseguimento: Date,
    risposteEsatte: number,
  ) {
    this.quiz = quiz;
    this.utente = utente;
    this.esito = esito;
    this.dataConseguimento = dataConseguimento;
    this.risposteEsatte = risposteEsatte;
  }

  // Getters
  public getQuiz(): Quiz {
    return this.quiz;
  }

  public getUtente(): Utente {
    return this.utente;
  }

  public getEsito(): boolean {
    return this.esito;
  }

  public getDataConseguimento(): Date {
    return this.dataConseguimento;
  }

  public getRisposteEsatte(): number {
    return this.risposteEsatte;
  }

  // Setters
  public setQuiz(value: Quiz) {
    this.quiz = value;
  }

  public setUtente(value: Utente) {
    this.utente = value;
  }

  public setEsito(value: boolean) {
    this.esito = value;
  }

  public setDataConseguimento(value: Date) {
    this.dataConseguimento = value;
  }

  public setRisposteEsatte(value: number) {
    this.risposteEsatte = value;
  }
}
