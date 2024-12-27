import { useRouter } from "next/router";
import { useTutorials } from "@/hooks/useTutorials";
import "../src/app/css/ListaTutorial.css";

const ListTutorials = () => {
  const {
    tutorials,
    filteredTutorials,
    selectedCategory,
    setSelectedCategory,
    setFilteredTutorials,
  } = useTutorials();

  console.log(tutorials);

  const router = useRouter();

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

  /* Svuota il localStorage
  const handleClearLocalStorage = () => {
    localStorage.removeItem("tutorials");
    router.reload();
  }; */

  return (
    <div className="main-container">
      <header className="header-container">
        <h1 className="page-title">Lista Tutorial</h1>
        <button className="create-button" onClick={handleCreateNewTutorial}>
          Crea Nuovo Tutorial
        </button>
        {/* <button className="clear-button" onClick={handleClearLocalStorage}>
          Cancella Tutti i Tutorial (temporaneo)
        </button> */}
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
                  src={`https://picsum.photos/id/${tutorial.id}/1280/720`}
                  // src={tutorial.grafica}
                  alt={tutorial.titolo}
                />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ListTutorials;
