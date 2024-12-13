import { useState } from "react";
import Header from "../src/app/Components/Header"; // Importa il componente Header
import Footer from "../src/app/Components/Footer"; // Importa il componente Footer
import Link from 'next/link'; // Importa Link da Next.js

const Register = () => {
  // Stato per i campi del form
  const [nome, setNome] = useState<string>("");
  const [cognome, setCognome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validazione dei campi
    if (!nome || !cognome || !email || !password || !confirmPassword) {
      setError("Tutti i campi sono obbligatori.");
      setSuccess(null);
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      setSuccess(null);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("L'email non è valida.");
      setSuccess(null);
      return;
    }

    setError(null); // Clear errors

    try {
      // Invio dei dati al server
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cognome, email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Errore durante la registrazione.");
      }

      const data = await response.json();
      setSuccess("Registrazione completata con successo! Benvenuto!");
      setNome("");
      setCognome("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <>
      <Header /> {/* Inserisci il Header */}
      
      <div style={styles.mainContainer}>
        <div style={styles.container}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h1>Registrazione</h1>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            
            <div style={styles.inputGroup}>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.input}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label htmlFor="cognome">Cognome</label>
              <input
                type="text"
                id="cognome"
                name="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword">Conferma Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>
              Registrati
            </button>

            <h6 style={styles.link}>
              Hai già un account? 
              <Link href="/login">Accedi ora.</Link>
            </h6>
          </form>
        </div>
      </div>

      <Footer /> {/* Inserisci il Footer */}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1, // Occupare il resto dello spazio disponibile tra header e footer
    marginTop: "30px",  // Margine sopra la card
    marginBottom: "30px",  // Margine sotto la card
  },
  form: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "0.5rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#1d5c31",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  success: {
    color: "green",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  link: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.9rem",
  }
};

export default Register;
