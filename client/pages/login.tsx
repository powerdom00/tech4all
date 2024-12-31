import { useState } from "react";
import React from "react";
import "../src/app/css/Login.css";
import { useRouter } from "next/router";
import { useAuth } from "./context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth(); // Usa il metodo login dal contesto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string): string | null => {
    if (!email.includes("@")) return "L'email deve contenere il simbolo '@'.";
    if (email.length > 60) return "L'email non può superare i 60 caratteri.";
    if (!/\.(com|it)$/.test(email))
      return "L'email deve terminare con '.com' o '.it'.";
    return null;
  };

  const sanitizeInput = (input: string): string => {
    // Rimuove script o tag HTML
    return input.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    const emailError = validateEmail(sanitizedEmail);

    if (emailError) {
      setError(emailError);
      return;
    }

    if (!sanitizedPassword) {
      setError("La password non può essere vuota.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          password: sanitizedPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Email o password errati.");
      }

      const data = await res.json();

      console.log("Dati utente ricevuti dal backend:", data);
      // Passa i dati dell'utente al contesto
      login(data.user);

      alert(`Benvenuto, ${data.user?.nome || "utente"}!`);
      router.push("/homepage").then(() => router.reload());
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
