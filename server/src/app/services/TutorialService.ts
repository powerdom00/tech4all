import { TutorialDao } from "../dao/TutorialDao";
import { Tutorial } from "../entity/gestione_tutorial/Tutorial";

export class TutorialService {
  private tutorialDao: TutorialDao;

  constructor() {
    this.tutorialDao = new TutorialDao();
  }

  public async getAllTutorials(): Promise<Tutorial[]> {
    return this.tutorialDao.getAllTutorials();
  }

  public async createTutorial(tutorialData: {
    titolo: string;
    testo: string;
    categoria: string;
  }): Promise<void> {
    const { titolo, testo, categoria } = tutorialData;
    const tutorial = new Tutorial(titolo, "", testo, categoria, 1);
    await this.tutorialDao.createTutorial(tutorial);
  }

  public async getTutorialById(id: number): Promise<Tutorial | null> {
    return this.tutorialDao.getTutorialById(id);
  }

  public async updateTutorial(
    id: number,
    tutorialData: {
      titolo: string;
      testo: string;
      categoria: string;
    }
  ): Promise<void> {
    const { titolo, testo, categoria } = tutorialData;
    const tutorial = new Tutorial(titolo, "", testo, categoria, 1, id);
    await this.tutorialDao.updateTutorial(tutorial);
  }

  public async deleteTutorial(id: number): Promise<void> {
    await this.tutorialDao.deleteTutorial(id);
  }
}
