import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../src/app/css/CreaTutorial.css";

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

  // handleSubmit per una richiesta POST /tutorial
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
      formData.append("valutazione", "1");

      const response = await fetch("http://localhost:5000/tutorials/tutorial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: formData,
        body: JSON.stringify({
          titolo,
          testo,
          categoria,
          grafica: "nessuna",
          valutazione: "1",
        }),
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
      router.push("/ListaTutorial");
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  //  handleSubmit che inserisce il tutorial nel localStorage e carica l'immagine in public/Media con una richiesta POST /upload
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const testo = editor?.root.innerHTML;

  //   // Validazione dei campi
  //   if (!titolo || !testo || !categoria || !grafica) {
  //     setError("Tutti i campi sono obbligatori.");
  //     setSuccess(null);
  //     return;
  //   }

  //   /* blocco try per il caricamento dell'immagine tramite chiamata POST /upload

  //   try {
  //     // Carica l'immagine sul server
  //     const formData = new FormData();
  //     formData.append("file", grafica);

  //     const uploadResponse = await fetch("http://localhost:5000/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!uploadResponse.ok) {
  //       const { error } = await uploadResponse.json();
  //       throw new Error(
  //         error || "Errore durante il caricamento dell'immagine."
  //       );
  //     }

  //     const { filePath } = await uploadResponse.json();
  //     */

  //   // Recupera i tutorial esistenti dal localStorage
  //   const tutorials = JSON.parse(localStorage.getItem("tutorials") || "[]");

  //   // Assegna un ID incrementale al nuovo tutorial
  //   const newId =
  //     tutorials.length > 0 ? tutorials[tutorials.length - 1].id + 1 : 1;

  //   const tutorial = {
  //     id: newId,
  //     titolo,
  //     testo,
  //     categoria,
  //     // grafica: filePath, <- path locale della grafica di copertina
  //     grafica: "nessuna",
  //     valutazione: "1",
  //   };

  //   // Salva il nuovo tutorial nel localStorage
  //   tutorials.push(tutorial);
  //   localStorage.setItem("tutorials", JSON.stringify(tutorials));

  //   setSuccess("Tutorial creato con successo!");
  //   setError(null);
  //   setTitolo("");
  //   setCategoria("");
  //   editor?.setText("");

  //   // Redirect alla lista di tutorial
  //   router.push("/ListaTutorial");
  //   /* blocco catch

  //   } catch (err: any) {
  //     setError(err.message);
  //     setSuccess(null);
  //   } */
  // };

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
            <label htmlFor="grafica">Grafica:</label>
            <input
              id="grafica"
              type="file"
              className="form-input"
              accept="image/*"
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
