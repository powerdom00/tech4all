import { useState, useEffect } from "react";
import { Tutorial } from "@/interfacce/Tutorial";
import ApiControllerFacade from "@/controller/ApiControllerFacade";

type Props = {
  id: string;
};

const TutorialPageComponent = ({ id }: Props) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  useEffect(() => {
    const fetchTutorial = async () => {
      const data = await ApiControllerFacade.getTutorialById(Number(id));
      setTutorial(data);
    };

    fetchTutorial();
  }, [id]);

  if (!tutorial) {
    return <div>Loading tutorial...</div>;
  }

  return (
    <div>
      <h2>{tutorial.titolo}</h2>
      <div dangerouslySetInnerHTML={{ __html: tutorial.testo }} />
    </div>
  );
};

export default TutorialPageComponent;
