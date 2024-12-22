import { useRouter } from "next/router";
import { useTutorials } from "@/hooks/useTutorials";

const ListTutorials = () => {
  const {
    tutorials,
    filteredTutorials,
    selectedCategory,
    setSelectedCategory,
    setFilteredTutorials,
  } = useTutorials();

  const router = useRouter();

  const handleCreateNewTutorial = () => {
    router.push("/tutorials/createTutorial");
  };

  const handleTutorialClick = (id: number) => {
    router.push(`/tutorials/${id}`);
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
    <div className="container">
      <main>
        <h1>All Tutorials</h1>
        <button onClick={handleCreateNewTutorial}>Create New Tutorial</button>
        <div>
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value=""></option>
            {Array.from(
              new Set(tutorials.map((tutorial) => tutorial.categoria))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {filteredTutorials.map((tutorial) => (
            <li
              key={tutorial.id}
              onClick={() => handleTutorialClick(tutorial.id)}
            >
              <h2>{tutorial.titolo}</h2>
              <img
                src={`https://picsum.photos/id/${tutorial.id}/350/250`}
                alt={tutorial.titolo}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ListTutorials;
