import { useEffect, useState } from "react";
import { fetchTutorials } from "../api/tutorials";
import { Tutorial } from "@/interfacce/Tutorial";

export const useTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadTutorials = async () => {
      try {
        const data = await fetchTutorials();
        setTutorials(data);
        setFilteredTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials", error);
      }
    };
    loadTutorials();
  }, []);

  return {
    tutorials,
    filteredTutorials,
    selectedCategory,
    setSelectedCategory,
    setFilteredTutorials,
  };
};
