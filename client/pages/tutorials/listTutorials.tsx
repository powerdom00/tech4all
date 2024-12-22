import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";

interface Tutorial {
  id: number;
  titolo: string;
  testo: string;
  categoria: string;
  grafica: string;
}

const ListTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/tutorials/tutorial"
        );
        const data: Tutorial[] = await response.json();
        setTutorials(data);
        setFilteredTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials", error);
      }
    };
    fetchTutorials();
  }, []);

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
            <option value="">All</option>
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
                src={`http://localhost:5000/${tutorial.grafica}`}
                // src={`C:/Users/cerch/Desktop/newProjects/myfork4/tech4all/server/uploads/1734866445378-MKF79691G.jpg`}
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
