import { Tutorial } from "@/interfacce/Tutorial";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "../../src/app/css/Tutorial.css";

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
          const response = await fetch(
            `http://localhost:5000/tutorials/tutorial/${id}`
          );
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
      const response = await fetch(
        `http://localhost:5000/tutorials/tutorial/${id}`,
        {
          method: "DELETE",
        }
      );
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
      const response = await fetch(
        `http://localhost:5000/tutorials/tutorial/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ titolo, testo, categoria }),
        }
      );
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
    <div className="main-container">
      <header className="header-container">
        <h1 className="page-title">
          {isEditing ? "Modifica Tutorial" : tutorial.titolo}
        </h1>
      </header>
      <main className="content-container">
        {message && <p className="form-message">{message}</p>}
        {isEditing ? (
          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="titolo">Titolo:</label>
              <input
                id="titolo"
                type="text"
                className="form-input"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testo">Testo:</label>
              <textarea
                id="testo"
                className="form-textarea"
                value={testo}
                onChange={(e) => setTesto(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoria:</label>
              <input
                id="categoria"
                type="text"
                className="form-input"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">
                Salva
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Annulla
              </button>
            </div>
          </form>
        ) : (
          <div className="tutorial-details">
            <p className="tutorial-category">Categoria: {tutorial.categoria}</p>
            <div
              className="tutorial-text"
              dangerouslySetInnerHTML={{ __html: tutorial.testo }}
            />
            <div className="button-container">
              <button className="delete-button" onClick={handleDelete}>
                Elimina Tutorial
              </button>
              <button className="update-button" onClick={handleUpdate}>
                Modifica Tutorial
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TutorialPage;
