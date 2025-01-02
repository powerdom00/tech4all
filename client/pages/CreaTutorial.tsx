import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../src/css/CreaTutorial.css";
import ApiControllerFacade from "@/controller/ApiControllerFacade";

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
    const categorieValide = [
      "Internet",
      "Social Media",
      "Tecnologia",
      "Sicurezza",
    ];
    if (!titolo || !testo || !categoria || !grafica) {
      setError("Tutti i campi sono obbligatori.");
      setSuccess(null);
      return;
    }

    if (!categorieValide.includes(categoria)) {
      setError(
        "La categoria deve essere una tra 'Internet', 'Social Media', 'Tecnologia' o 'Sicurezza'."
      );
      setSuccess(null);
      return;
    }

    if (categoria.length > 25) {
      setError("La categoria non può superare i 25 caratteri.");
      setSuccess(null);
      return;
    }

    const fileType = grafica.type;
    if (
      !["image/jpeg", "image/png", "image/gif", "video/mp4"].includes(fileType)
    ) {
      setError(
        "Il file deve essere un'immagine (JPEG/PNG/GIF) o un video MP4."
      );
      setSuccess(null);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titolo", titolo);
      formData.append("testo", testo);
      formData.append("categoria", categoria);
      formData.append("grafica", grafica);

      await ApiControllerFacade.createTutorial(formData);

      setSuccess("Tutorial creato con successo!");
      setError(null);
      setTitolo("");
      setCategoria("");
      editor?.setText("");

      // Redirect to the list of tutorials
      router.push("/ListaTutorial");
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="main-container">
      <header className="header-container">
        <h1 className="page-title">Crea un nuovo Tutorial</h1>
      </header>
      <main className="form-container">
        <form className="tutorial-form" onSubmit={handleSubmit}>
          {error && <p className="form-message error">{error}</p>}
          {success && <p className="form-message success">{success}</p>}
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
            <label htmlFor="categoria">Categoria:</label>
            <input
              id="categoria"
              type="text"
              className="form-input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editor">Testo:</label>
            <div id="editor" ref={editorRef} className="quill-editor"></div>
          </div>
          <div className="form-group">
            <label htmlFor="grafica">Grafica (immagine o video MP4):</label>
            <input
              id="grafica"
              type="file"
              className="form-input"
              accept="image/*,video/mp4"
              onChange={(e) => setGrafica(e.target.files?.[0] || null)}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Crea Tutorial
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateTutorial;
