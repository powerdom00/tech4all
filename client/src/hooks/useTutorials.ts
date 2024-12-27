import { useEffect, useState } from "react";
import { fetchTutorials } from "../api/tutorials";
import { Tutorial } from "@/interfacce/Tutorial";

export const useTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // richiama un GET /tutorials
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

  /* Ottieni i tutorials dal localStorage
  useEffect(() => {
    const loadTutorials = () => {
      try {
        const data = JSON.parse(localStorage.getItem("tutorials") || "[]");
        setTutorials(data);
        setFilteredTutorials(data);
      } catch (error) {
        console.error("Error loading tutorials from localStorage", error);
      }
    };
    loadTutorials();
  }, []); */

  return {
    tutorials,
    filteredTutorials,
    selectedCategory,
    setSelectedCategory,
    setFilteredTutorials,
  };
};
