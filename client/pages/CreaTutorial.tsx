import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css";
import styles from "../src/css/CreaTutorial.module.css";
import ApiControllerFacade from "@/controller/ApiControllerFacade";
import { Categoria } from "../../server/src/app/entity/gestione_tutorial/Categoria";
import "../src/css/quill.css";

const CreateTutorial = () => {
  const [titolo, setTitolo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [grafica, setGrafica] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && editorRef.current) {
      import("quill").then((Quill) => {
        const quill = new Quill.default(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              [{ font: [] }],
              [{ align: [] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ color: [] }, { background: [] }],
              ["blockquote", "code-block"],
              ["link", "image", "video"],
              ["clean"],
            ],
          },
        });

        setEditor(quill);
      });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const testo = editor?.root.innerHTML;

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

      const response = await ApiControllerFacade.createTutorial(formData);
      console.log(response);

      if (response.success) {
        setSuccess(response.message);
        setShowPopup(true);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    router.push("/ListaTutorial");
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Crea un nuovo Tutorial</h1>
      </header>
      <main className={styles.formContainer}>
        <form className={styles.tutorialForm} onSubmit={handleSubmit}>
          {error && (
            <p className={`${styles.formMessage} ${styles.error}`}>{error}</p>
          )}
          {success && (
            <p className={`${styles.formMessage} ${styles.success}`}>
              {success}
            </p>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="titolo">Titolo:</label>
            <input
              id="titolo"
              type="text"
              className={styles.formInput}
              value={titolo}
              onChange={(e) => setTitolo(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="categoria">Categoria:</label>
            <select
              id="categoria"
              className={styles.formInput}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
            >
              <option value="">Seleziona una categoria</option>
              {Object.values(Categoria).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="editor">Testo:</label>
            <div
              id="editor"
              ref={editorRef}
              // className={styles.quillEditor}
            ></div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="grafica">Grafica:</label>
            <input
              id="grafica"
              type="file"
              className={styles.formInput}
              accept="image/*,video/mp4"
              onChange={(e) => setGrafica(e.target.files?.[0] || null)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Crea Tutorial
            </button>
          </div>
        </form>
      </main>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>{success}</p>
            <button onClick={handlePopupConfirm}>Conferma</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTutorial;
