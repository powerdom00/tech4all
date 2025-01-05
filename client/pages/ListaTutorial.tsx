import styles from "../src/css/ListaTutorial.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext"; // Assicurati di importare correttamente il contesto
import { Tutorial } from "@/interfacce/Tutorial";
import ApiControllerFacade from "@/controller/ApiControllerFacade";

const ListTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { user } = useAuth(); // Recupera il ruolo dell'utente dal contesto
  const router = useRouter();

  useEffect(() => {
    const fetchTutorials = async () => {
      const data = await ApiControllerFacade.getTutorials();
      setTutorials(data);
      setFilteredTutorials(data);
    };

    fetchTutorials();
  }, []);

  const handleCreateNewTutorial = () => {
    router.push("/CreaTutorial");
  };

  const handleTutorialClick = (id: number) => {
    router.push(`/Contenuto/${id}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredTutorials(
        tutorials.filter((tutorial) => tutorial.categoria === category)
      );
    } else {
      setFilteredTutorials(tutorials);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Lista Tutorial</h1>

        {/* Mostra il bottone solo se user.ruolo è "admin" o un altro valore specifico */}
        {user?.ruolo && (
          <button
            className={styles.createButton}
            onClick={handleCreateNewTutorial}
          >
            Crea Nuovo Tutorial
          </button>
        )}
      </header>
      <div className={styles.filterContainer}>
        <label className={styles.filterLabel} htmlFor="category">
          Filtra per Categoria:
        </label>
        <select
          className={styles.filterSelect}
          id="category"
          value={selectedCategory || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Tutte</option>
          {Array.from(
            new Set(tutorials.map((tutorial) => tutorial.categoria))
          ).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <main className={styles.contentContainer}>
        <ul className={styles.tutorialList}>
          {filteredTutorials.map((tutorial) => (
            <li
              className={styles.tutorialItem}
              key={tutorial.id}
              onClick={() => handleTutorialClick(tutorial.id)}
            >
              <h2 className={styles.tutorialTitle}>{tutorial.titolo}</h2>
              <div className={styles.thumbnailContainer}>
                <img
                  className={`${styles.tutorialThumbnail} resized-image`}
                  src={`http://localhost:5000/${tutorial.grafica}`}
                  alt={tutorial.titolo}
                />
              </div>
            </li>
          ))}
        </ul>
      </main>
      <div className={styles.homeButtonContainer}>
        <Link href="/homepage">
          <button className={styles.homeButton}>Torna alla home</button>
        </Link>
      </div>
    </div>
  );
};

export default ListTutorials;
