import { useState } from "react";
import Header from "../src/app/Components/Header"; // Importa il componente Header
import Footer from "../src/app/Components/Footer"; // Importa il componente Footer
import Link from 'next/link'; // Importa Link da Next.js

const Register = () => {
  // Stato per i campi del form
  const [nome, setNome] = useState<string>("");
  const [cognome, setCognome] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [sesso, setSesso] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validazione dei campi
    if (!nome || !cognome || !username || !email || !password || !confirmPassword || !telefono || !sesso) {
      setError("Tutti i campi sono obbligatori.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }

    if (!/^\d+$/.test(telefono)) {
      setError("Il numero di telefono deve contenere solo numeri.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("L'email non è valida.");
      return;
    }

    setError(null); // Clear errors

    // Logica di invio al server (può essere un mock)
    console.log("Registrazione con", { nome, cognome, username, email, password, telefono, sesso });

    // Aggiungi qui la logica di invio al server, ad esempio usando fetch o axios
  };

  return (
    <>
      <Header /> {/* Inserisci il Header */}
      
      <div style={styles.mainContainer}>
        <div style={styles.container}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h1>Registrazione</h1>
            {error && <p style={styles.error}>{error}</p>}
            
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <div style={styles.inputGroup}>
              <label htmlFor="telefono">Numero di Telefono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="sesso">Sesso</label>
              <select
                id="sesso"
                name="sesso"
                value={sesso}
                onChange={(e) => setSesso(e.target.value)}
                style={styles.input}
              >
                <option value="">Seleziona...</option>
                <option value="uomo">Uomo</option>
                <option value="donna">Donna</option>
                <option value="altro">Altro</option>
              </select>
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
  link: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.9rem",
  }
};

export default Register;
