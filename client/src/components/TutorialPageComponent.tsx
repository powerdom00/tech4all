import { useState, useEffect } from "react";
import { Tutorial } from "@/interfacce/Tutorial";
import ApiFacade from "@/facade/ApiFacade";

type Props = {
  id: string;
};

const TutorialPageComponent = ({ id }: Props) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  useEffect(() => {
    const fetchTutorial = async () => {
      const data = await ApiFacade.getTutorialById(Number(id));
      setTutorial(data);
    };

    fetchTutorial();
  }, [id]);

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
