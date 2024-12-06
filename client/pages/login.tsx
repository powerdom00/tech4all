import { useState } from "react";
import Header from "../src/app/Components/Header"; // Importa il componente Header
import Footer from "../src/app/Components/Footer";
import Link from 'next/link'; // Importa Link da Next.js

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email e password sono obbligatorie.");
      return;
    }

    setError(null); // Clear errors

    // Logica di invio al server (può essere un mock)
    console.log("Logging in with", { email, password });
  };

  return (
    <>
      <Header /> {/* Inserisci il Header */}
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1>Login</h1>
          {error && <p style={styles.error}>{error}</p>}
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
                    <h6>Non sei ancora registrato?
          <Link href="/register"> {/* Usa Link per Next.js */}
              Registrati ora.
          </Link>
        </h6>
          </div>
          <button type="submit" style={styles.button}>
            Accedi
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
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
  
};

export default Login;
