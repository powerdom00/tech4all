import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/app/Components/Footer";
import Header from "@/app/Components/Header";

const CreateTutorial = () => {
  const [titolo, setTitolo] = useState("");
  const [testo, setTesto] = useState("");
  const [categoria, setCategoria] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validazione dei campi
    if (!titolo || !testo || !categoria) {
      setError("Tutti i campi sono obbligatori.");
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/tutorials/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titolo, testo, categoria }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Errore durante la creazione del tutorial.");
      }

      setSuccess("Tutorial creato con successo!");
      setError(null);
      setTitolo("");
      setTesto("");
      setCategoria("");

      // Redirect to the list of tutorials
      router.push("/tutorials/listTutorials");
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container">
      <Header />
      <main>
        <h1>Crea un nuovo Tutorial</h1>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <div>
            <label>Titolo:</label>
            <input
              type="text"
              value={titolo}
              onChange={(e) => setTitolo(e.target.value)}
            />
          </div>
          <div>
            <label>Categoria:</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          <div>
            <label>Testo:</label>
            <textarea
              value={testo}
              onChange={(e) => setTesto(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Crea Tutorial</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTutorial;
