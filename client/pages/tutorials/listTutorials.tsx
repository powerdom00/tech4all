import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";

interface Tutorial {
  id: number;
  titolo: string;
  testo: string;
  categoria: string;
}

const ListTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:5000/tutorials/list");
        const data: Tutorial[] = await response.json();
        setTutorials(data);
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

  return (
    <div className="container">
      <Header />
      <main>
        <h1>All Tutorials</h1>
        <button onClick={handleCreateNewTutorial}>Create New Tutorial</button>
        <ul>
          {tutorials.map((tutorial) => (
            <li
              key={tutorial.id}
              onClick={() => handleTutorialClick(tutorial.id)}
            >
              <h2>{tutorial.titolo}</h2>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default ListTutorials;
