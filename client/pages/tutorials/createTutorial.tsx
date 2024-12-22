import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const CreateTutorial = () => {
  const [titolo, setTitolo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [grafica, setGrafica] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Quill | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
      });
      setEditor(quill);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const testo = editor?.root.innerHTML;

    // Validazione dei campi
    if (!titolo || !testo || !categoria || !grafica) {
      setError("Tutti i campi sono obbligatori.");
      setSuccess(null);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titolo", titolo);
      formData.append("testo", testo);
      formData.append("categoria", categoria);
      formData.append("grafica", grafica);

      const response = await fetch("http://localhost:5000/tutorials/tutorial", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Errore durante la creazione del tutorial.");
      }

      setSuccess("Tutorial creato con successo!");
      setError(null);
      setTitolo("");
      setCategoria("");
      editor?.setText("");

      // Redirect to the list of tutorials
      router.push("/tutorials/listTutorials");
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container">
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
            <div ref={editorRef} style={{ height: "300px" }}></div>
          </div>
          <div>
            <label>Grafica:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGrafica(e.target.files?.[0] || null)}
            />
          </div>
          <button type="submit">Crea Tutorial</button>
        </form>
      </main>
    </div>
  );
};

export default CreateTutorial;
