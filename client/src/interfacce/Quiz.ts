export interface Domanda {
  id: number;
  quiz_id: number;
  domanda: string;
}

export interface Risposta {
  id: number;
  domanda_id: number;
  risposta: string;
  corretta: boolean;
}

export interface Quiz {
  id: number;
  tutorialId: number;
  domande: Domanda[];
}
