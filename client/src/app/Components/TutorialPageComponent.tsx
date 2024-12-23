import { useState, useEffect } from "react";
import { Tutorial } from "@/interfacce/Tutorial";

type Props = {
  id: string;
};

const TutorialPageComponent = ({ id }: Props) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

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

  if (!tutorial) {
    return <div>Loading tutorial...</div>;
  }

  return (
    <div>
      <h2>{tutorial.titolo}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: tutorial.testo }}
      />
      <p>Categoria: {tutorial.categoria}</p>
    </div>
  );
};

export default TutorialPageComponent;
