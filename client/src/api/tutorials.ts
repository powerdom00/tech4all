import { Tutorial } from "@/interfacce/Tutorial";

export const fetchTutorials = async (): Promise<Tutorial[]> => {
  const response = await fetch("http://localhost:5000/tutorials/tutorial");
  if (!response.ok) {
    throw new Error("Error fetching tutorials");
  }
  return response.json();
};
