import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Tutorial {
  id: number;
  titolo: string;
  testo: string;
  categoria: string;
}

const TutorialPage = () => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [titolo, setTitolo] = useState("");
  const [testo, setTesto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTutorial = async () => {
        try {
          const response = await fetch(`http://localhost:5000/tutorials/${id}`);
          const data: Tutorial = await response.json();
          setTutorial(data);
          setTitolo(data.titolo);
          setTesto(data.testo);
          setCategoria(data.categoria);
        } catch (error) {
          console.error("Error fetching tutorial", error);
        }
      };
      fetchTutorial();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tutorials/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/tutorials/listTutorials");
      } else {
        console.error("Failed to delete tutorial");
      }
    } catch (error) {
      console.error("Error deleting tutorial", error);
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/tutorials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titolo, testo, categoria }),
      });
      if (response.ok) {
        const result = await response.json();
        setTutorial(result.tutorial);
        setMessage(result.message);
        setIsEditing(false);
      } else {
        console.error("Failed to update tutorial");
      }
    } catch (error) {
      console.error("Error updating tutorial", error);
    }
  };

  if (!tutorial) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Header />
      <main>
        {message && <p>{message}</p>}
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
              />
            </div>
            <div>
              <label>Text:</label>
              <textarea
                value={testo}
                onChange={(e) => setTesto(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h1>{tutorial.titolo}</h1>
            <p>{tutorial.testo}</p>
            <p>Category: {tutorial.categoria}</p>
            <button onClick={handleDelete}>Delete Tutorial</button>
            <button onClick={handleUpdate}>Update Tutorial</button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TutorialPage;
