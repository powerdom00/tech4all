export class Tutorial {
  /**
   * Identificativo unico del tutorial.
   * Viene assegnato automaticamente e non dovrebbe essere modificato manualmente.
   */
  private _id?: number | undefined;

  /**
   * Titolo descrittivo del tutorial.
   */
  private _titolo: string;

  /**
   * URL dell'immagine associata al tutorial (ad esempio, un'anteprima).
   */
  private _grafica: string;

  /**
   * Contenuto principale del tutorial.
   */
  private _testo: string;

  /**
   * Categoria a cui appartiene il tutorial (es. programmazione, design, ecc.).
   */
  private _categoria: string;

  /**
   * Valutazione media del tutorial da parte degli utenti, su una scala da 1 a 5.
   */
  private _valutazione: number;

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
    valutazione: number,
    /** Identificativo unico */
    id?: number | undefined,
  ) {
    /** Assegna il titolo */
    this._titolo = titolo;
    /** Assegna l'URL dell'immagine */
    this._grafica = grafica;
    /** Assegna il testo del tutorial */
    this._testo = testo;
    /** Assegna la categoria */
    this._categoria = categoria;
    /** Assegna la valutazione, validandola */
    this._valutazione = this.validateValutazione(valutazione);
    /** Assegna il valore dell'ID */
    this._id = id;
  }

  /**
   * Restituisce l'identificativo unico del tutorial.
   */
  public get id(): number | undefined {
    return this._id;
  }

  /**
   * Sets the unique identifier of the feedback.
   */
  public set id(value: number | undefined) {
    this._id = value;
  }

  /**
   * Imposta il titolo del tutorial.
   *
   * @param value Nuovo titolo del tutorial.
   */
  public set titolo(value: string) {
    this._titolo = value;
  }

  /**
   * Restituisce il titolo del tutorial.
   */
  public get titolo(): string {
    return this._titolo;
  }

  /**
   * Imposta l'URL dell'immagine associata al tutorial.
   *
   * @param value Nuovo URL dell'immagine.
   */
  public set grafica(value: string) {
    this._grafica = value;
  }

  /**
   * Restituisce l'URL dell'immagine associata al tutorial.
   */
  public get grafica(): string {
    return this._grafica;
  }

  /**
   * Imposta il contenuto del tutorial.
   *
   * @param value Nuovo contenuto del tutorial.
   */
  public set testo(value: string) {
    this._testo = value;
  }

  /**
   * Restituisce il contenuto del tutorial.
   */
  public get testo(): string {
    return this._testo;
  }

  /**
   * Imposta la categoria del tutorial.
   *
   * @param value Nuova categoria del tutorial.
   */
  public set categoria(value: string) {
    this._categoria = value;
  }

  /**
   * Restituisce la categoria del tutorial.
   */
  public get categoria(): string {
    return this._categoria;
  }

  /**
   * Imposta la valutazione del tutorial.
   * La valutazione deve essere un numero compreso tra 1 e 5.
   *
   * @param value Nuova valutazione del tutorial.
   */
  public set valutazione(value: number) {
    this._valutazione = this.validateValutazione(value);
  }

  /**
   * Restituisce la valutazione del tutorial.
   */
  public get valutazione(): number {
    return this._valutazione;
  }

  /**
   * Valida la valutazione del tutorial.
   *
   * @param value Valutazione da validare.
   * @returns La valutazione validata.
   * @throws RangeError Se la valutazione non è compresa tra 1 e 5.
   */
  private validateValutazione(value: number): number {
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
