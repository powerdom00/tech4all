import { useState } from "react";
import Link from "next/link"; // Importa Link da Next.js
import React from "react";
// eslint-disable-next-line prettier/prettier
import { useRouter } from "next/router";
import "../src/css/Register.css";
import ApiControllerFacade from "@/controller/ApiControllerFacade";

const Register = () => {
  // Stato per i campi del form
  const [nome, setNome] = useState<string>("");
  const [cognome, setCognome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const sanitizeInput = (input: string): string => {
    // Rimuove script o tag HTML
    return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
  };

  const validateInputs = (): string | null => {
    const sanitizedNome = sanitizeInput(nome);
    const sanitizedCognome = sanitizeInput(cognome);
    const sanitizedEmail = sanitizeInput(email);

    if (
      !sanitizedNome ||
      sanitizedNome.length > 50 ||
      /\d|\W/.test(sanitizedNome)
    ) {
      return "Il nome deve contenere solo lettere e massimo 50 caratteri.";
    }

    if (
      !sanitizedCognome ||
      sanitizedCognome.length > 50 ||
      /\d|\W/.test(sanitizedCognome)
    ) {
      return "Il cognome deve contenere solo lettere e massimo 50 caratteri.";
    }

    if (
      !sanitizedEmail.includes("@") ||
      !/\.(com|it)$/.test(sanitizedEmail) ||
      sanitizedEmail.length > 60
    ) {
      return "L'email deve essere valida, contenere '@' e terminare con '.com' o '.it' (max 60 caratteri).";
    }

    if (!password || password.length < 8) {
      return "La password deve essere di almeno 8 caratteri.";
    }

    if (password !== confirmPassword) {
      return "Le password non corrispondono.";
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Sanifica e valida gli input
    setError(null);
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Invio dei dati al server tramite ApiFacade
      await ApiControllerFacade.registerUser(
        sanitizeInput(nome),
        sanitizeInput(cognome),
        sanitizeInput(email),
        sanitizeInput(password)
      );

      setSuccess("Registrazione completata con successo! Benvenuto!");
      setNome("");
      setCognome("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/homepage");
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form onSubmit={handleSubmit} className="form">
            <h1>Registrazione</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <div className="input-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="cognome">Cognome</label>
              <input
                type="text"
                id="cognome"
                name="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Conferma Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
            </div>

            <button type="submit" className="button">
              Registrati
            </button>

            <h6 className="link">
              Hai già un account?
              <Link href="/login">Accedi ora.</Link>
            </h6>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
