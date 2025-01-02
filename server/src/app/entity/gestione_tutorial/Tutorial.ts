export class Tutorial {
  /**
   * Identificativo unico del tutorial.
   * Viene assegnato automaticamente e non dovrebbe essere modificato manualmente.
   */
  private id?: number | undefined;
  /**
   * Titolo descrittivo del tutorial.
   */
  private titolo: string;
  /**
   * URL dell'immagine associata al tutorial (ad esempio, un'anteprima).
   */
  private grafica: string;
  /**
   * Contenuto principale del tutorial.
   */
  private testo: string;
  /**
   * Categoria a cui appartiene il tutorial (es. programmazione, design, ecc.).
   */
  private categoria: string;
  /**
   * Valutazione media del tutorial da parte degli utenti, su una scala da 1 a 5.
   */
  private valutazione: number | undefined;

  /**
   * Costruttore della classe Tutorial.
   *
   * @param titolo Titolo descrittivo del tutorial.
   * @param grafica URL dell'immagine associata al tutorial.
   * @param testo Contenuto principale del tutorial.
   * @param categoria Categoria a cui appartiene il tutorial.
   * @param valutazione Valutazione iniziale del tutorial.
   * @param id Identificativo unico del tutorial.
   */
  constructor(
    /** Titolo del tutorial */
    titolo: string,
    /** URL dell'immagine */
    grafica: string,
    /** Contenuto del tutorial */
    testo: string,
    /** Categoria del tutorial */
    categoria: string,
    /** Valutazione iniziale */
    valutazione?: number | undefined,
    /** Identificativo unico */
    id?: number | undefined,
  ) {
    /** Assegna il titolo */
    this.titolo = titolo;
    /** Assegna l'URL dell'immagine */
    this.grafica = grafica;
    /** Assegna il testo del tutorial */
    this.testo = testo;
    /** Assegna la categoria */
    this.categoria = categoria;
    /** Assegna la valutazione, validandola */
    this.valutazione = this.validateValutazione(valutazione);
    /** Assegna il valore dell'ID */
    this.id = id;
  }

  // Getter
  /**
   * Restituisce l'identificativo unico del tutorial.
   */
  public getId(): number | undefined {
    return this.id;
  }

  /**
   * Restituisce il titolo del tutorial.
   */
  public getTitolo(): string {
    return this.titolo;
  }

  /**
   * Restituisce l'URL dell'immagine associata al tutorial.
   */
  public getGrafica(): string {
    return this.grafica;
  }

  /**
   * Restituisce il contenuto del tutorial.
   */
  public getTesto(): string {
    return this.testo;
  }

  /**
   * Restituisce la categoria del tutorial.
   */
  public getCategoria(): string {
    return this.categoria;
  }

  /**
   * Restituisce la valutazione del tutorial.
   */
  public getValutazione(): number | undefined {
    return this.valutazione;
  }

  // Setter
  /**
   * Sets the unique identifier of the feedback.
   */
  public setId(value: number | undefined) {
    this.id = value;
  }

  /**
   * Imposta il titolo del tutorial.
   *
   * @param value Nuovo titolo del tutorial.
   */
  public setTitolo(value: string) {
    this.titolo = value;
  }

  /**
   * Imposta l'URL dell'immagine associata al tutorial.
   *
   * @param value Nuovo URL dell'immagine.
   */
  public setGrafica(value: string) {
    this.grafica = value;
  }

  /**
   * Imposta il contenuto del tutorial.
   *
   * @param value Nuovo contenuto del tutorial.
   */
  public setTesto(value: string) {
    this.testo = value;
  }

  /**
   * Imposta la categoria del tutorial.
   *
   * @param value Nuova categoria del tutorial.
   */
  public setCategoria(value: string) {
    this.categoria = value;
  }

  /**
   * Imposta la valutazione del tutorial.
   * La valutazione deve essere un numero compreso tra 1 e 5.
   *
   * @param value Nuova valutazione del tutorial.
   */
  public setValutazione(value: number) {
    this.valutazione = this.validateValutazione(value);
  }

  /**
   * Valida la valutazione del tutorial.
   *
   * @param value Valutazione da validare.
   * @returns La valutazione validata.
   * @throws RangeError Se la valutazione non è compresa tra 1 e 5.
   */
  private validateValutazione(value: number | undefined): number | undefined {
    if (value) {
      /** Verifica se la valutazione è valida */
      if (value >= 1 && value <= 5) {
        /** Se è valida, la restituisce */
        return value;
      } else {
        /** Altrimenti, lancia un'eccezione */
        throw new RangeError("La valutazione deve essere compresa tra 1 e 5");
      }
    }
  }
}
