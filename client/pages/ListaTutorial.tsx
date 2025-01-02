import "../src/css/ListaTutorial.css";
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
    router.push(`/Contenuto/${id}`).then(() => router.reload());
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
    <div className="main-container">
      <header className="header-container">
        <h1 className="page-title">Lista Tutorial</h1>

        {/* Mostra il bottone solo se user.ruolo è "admin" o un altro valore specifico */}
        {user?.ruolo && (
          <button className="create-button" onClick={handleCreateNewTutorial}>
            Crea Nuovo Tutorial
          </button>
        )}
      </header>
      <div className="filter-container">
        <label className="filter-label" htmlFor="category">
          Filtra per Categoria:
        </label>
        <select
          className="filter-select"
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
      <main className="content-container">
        <ul className="tutorial-list">
          {filteredTutorials.map((tutorial) => (
            <li
              className="tutorial-item"
              key={tutorial.id}
              onClick={() => handleTutorialClick(tutorial.id)}
            >
              <h2 className="tutorial-title">{tutorial.titolo}</h2>
              <div className="thumbnail-container">
                <img
                  className="tutorial-thumbnail resized-image"
                  // src={`https://picsum.photos/id/${tutorial.id}/1280/720`}
                  src={`http://localhost:5000/${tutorial.grafica}`}
                  alt={tutorial.titolo}
                />
              </div>
            </li>
          ))}
        </ul>
      </main>
      <div className="home-button-container">
        <Link href="/homepage">
          <button className="home-button">Torna alla home</button>
        </Link>
      </div>
    </div>
  );
};

export default ListTutorials;
