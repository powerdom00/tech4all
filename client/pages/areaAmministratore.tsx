import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import "../src/app/css/AreaUtente.css";
import Link from "next/link";

const AreaAmministratore: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    id: 0,
    nome: "",
    cognome: "",
    email: "",
    quiz_superati: "",
  });
  const [activeTab, setActiveTab] = useState("Anagrafica");

  // Dati statici degli utenti
  const utenti = [
    {
      id: 1,
      nome: "Mario",
      cognome: "Rossi",
      email: "user1@example.com",
      quiz_superati: 0,
      ruolo: false, // admin
    },
    {
      id: 2,
      nome: "Luigi",
      cognome: "Verdi",
      email: "user2@example.com",
      quiz_superati: 0,
      ruolo: false, // utente
    },
    {
      id: 3,
      nome: "Admin",
      cognome: "User",
      email: "admin@example.com",
      quiz_superati: 0,
      ruolo: true,
    },
  ];

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id,
        nome: user.nome || "",
        cognome: user.cognome || "",
        email: user.email || "",
        quiz_superati: user.quiz_superati || "0",
      });
    }
  }, [user]);

  const renderContent = () => {
    switch (activeTab) {
      case "Anagrafica":
        return (
          <>
            <div className="profile-info">
              <div className="profile-row">
                <span>Nome:</span>
                <span>{userData.nome}</span>
              </div>
              <div className="profile-row">
                <span>Cognome:</span>
                <span>{userData.cognome}</span>
              </div>
              <div className="profile-row">
                <span>Email:</span>
                <span>{userData.email}</span>
              </div>
              <div className="profile-row">
                <span>Quiz Superati:</span>
                <span>{userData.quiz_superati}</span>
              </div>
            </div>
          </>
        );
      case "Gestisci Utenti":
        return (
          <div className="users-container">
            <h2>Gestisci Utenti</h2>
            {utenti.length === 0 ? (
              <p>Nessun utente trovato.</p>
            ) : (
              <ul className="user-list">
                {utenti.map((utente) => (
                  <li key={utente.id} className="user-item">
                    <div>
                      <strong>Nome:</strong> {utente.nome} {utente.cognome}
                    </div>
                    <div>
                      <strong>Email:</strong> {utente.email}
                    </div>
                    <div>
                      <strong>Quiz Superati:</strong> {utente.quiz_superati}
                    </div>
                    <div>
                      <strong>Ruolo:</strong>{" "}
                      {utente.ruolo ? "Admin" : "Utente"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === "Anagrafica" ? "active" : ""}`}
          onClick={() => setActiveTab("Anagrafica")}
        >
          Anagrafica
        </button>
        <button
          className={`tab-button ${
            activeTab === "Gestisci Utenti" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Gestisci Utenti")}
        >
          Gestisci Utenti
        </button>
      </div>
      <div className="content-container">
        <div className="profile-container">
          {activeTab === "Anagrafica" && (
            <div className="avatar-placeholder">
              <img src="/Media/areaUtente.png" alt="Avatar" />
            </div>
          )}
          {renderContent()}
        </div>
        <div className="home-button-container">
          <Link href="/homepage">
            <button className="home-button">Torna alla home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AreaAmministratore;
