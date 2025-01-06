import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "../src/css/CreaTutorial.module.css";
import ApiControllerFacade from "@/controller/ApiControllerFacade";
import { Categoria } from "../../server/src/app/entity/gestione_tutorial/Categoria";
import TextEditor from "@/components/TextEditor-migliorato";

const CreateTutorial = () => {
  const [titolo, setTitolo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [grafica, setGrafica] = useState<File | null>(null);
  const [testo, setTesto] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
            {/* <label htmlFor="titolo">Titolo:</label> */}
            <input
              id="titolo"
              type="text"
              placeholder="Inserisci il titolo del tutorial"
              className={styles.formInput}
              value={titolo}
              onChange={(e) => setTitolo(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            {/* <label htmlFor="categoria">Categoria:</label> */}
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
            {/* <label htmlFor="testo">Testo:</label> */}
            <TextEditor value={testo} onChange={setTesto} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="grafica">Carica un immagine per la grafica:</label>
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
