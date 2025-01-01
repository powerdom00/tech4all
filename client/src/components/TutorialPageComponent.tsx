import { useState, useEffect } from "react";
import { Tutorial } from "@/interfacce/Tutorial";

type Props = {
  id: string;
};

const TutorialPageComponent = ({ id }: Props) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  // GET tutorial by id dal database
  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/tutorials/tutorial/${id}`
        );
        const data: Tutorial = await response.json();
        setTutorial(data);
      } catch (error) {
        console.error("Error fetching tutorial", error);
      }
    };

    fetchTutorial();
  }, [id]);

  /* GET tutorial by id dal localStorage
  useEffect(() => {
    const fetchTutorial = () => {
      try {
        const tutorials = JSON.parse(localStorage.getItem("tutorials") || "[]");
        const foundTutorial = tutorials.find(
          (tutorial: Tutorial) => tutorial.id === parseInt(id)
        );
        if (foundTutorial) {
          setTutorial(foundTutorial);
        } else {
          console.error("Tutorial not found");
        }
      } catch (error) {
        console.error("Error fetching tutorial from localStorage", error);
      }
    };

    fetchTutorial();
  }, [id]); */

  if (!tutorial) {
    return <div>Loading tutorial...</div>;
  }

  return (
    <div>
      <h2>titolo: {tutorial.titolo}</h2>
      <p>Testo:</p> <div dangerouslySetInnerHTML={{ __html: tutorial.testo }} />
      <p>Copertina: </p>
      <img
        className="resized-image"
        src={`http://localhost:5000/${tutorial.grafica}`}
        alt={tutorial.grafica}
      />
      <p>Categoria: {tutorial.categoria}</p>
    </div>
  );
};

export default TutorialPageComponent;
