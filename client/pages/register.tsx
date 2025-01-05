import { useState } from "react";
import Link from "next/link"; // Importa Link da Next.js
import React from "react";
// eslint-disable-next-line prettier/prettier
import { useRouter } from "next/router";
import styles from "../src/css/Register.module.css";
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

  const validateInputs = async (): Promise<string | null> => {
    const sanitizedNome = sanitizeInput(nome);
    const sanitizedCognome = sanitizeInput(cognome);
    const sanitizedEmail = sanitizeInput(email);

    const nomeCognomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+$/;

    if (
      !sanitizedNome ||
      sanitizedNome.length > 50 ||
      !nomeCognomeRegex.test(sanitizedNome)
    ) {
      return "Il nome deve contenere solo lettere (maiuscole e minuscole), lettere accentate, apostrofi e trattini, e massimo 50 caratteri.";
    }

    if (
      !sanitizedCognome ||
      sanitizedCognome.length > 50 ||
      !nomeCognomeRegex.test(sanitizedCognome)
    ) {
      return "Il cognome deve contenere solo lettere (maiuscole e minuscole), lettere accentate, apostrofi e trattini, e massimo 50 caratteri.";
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return "L'email deve essere valida e rispettare il formato richiesto.";
    }

    // Controlla se l'email è già registrata
    const emailExists = await ApiControllerFacade.checkEmailExists(
      sanitizedEmail
    );
    if (emailExists) {
      return "L'email è già registrata.";
    }

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,14}$/;
    if (!passwordRegex.test(password)) {
      return "La password deve essere compreso tra 8 e 14 caratteri, una lettera maiuscola, un numero e un carattere speciale.";
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
    const validationError = await validateInputs();
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
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Registrazione</h1>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <div className={styles.inputGroup}>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cognome">Cognome</label>
              <input
                type="text"
                id="cognome"
                name="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Conferma Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.button}>
              Registrati
            </button>

            <h6 className={styles.link}>
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
