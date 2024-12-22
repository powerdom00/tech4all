import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import "../src/app/css/AreaUtente.css";
import Link from "next/link";

const UserPage: React.FC = () => {
  const { user, updateUser } = useAuth(); // Funzione per aggiornare i dati utente
  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    email: "",
    quiz_superati: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Stato per mostrare/nascondere il modulo di modifica

  useEffect(() => {
    if (user) {
      setUserData({
        nome: user.nome || "",
        cognome: user.cognome || "",
        email: user.email || "",
        quiz_superati: user.quiz_superati || "0",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUser(userData); // Salva i nuovi dati (aggiorna il contesto o invia una richiesta al server)
    setIsEditing(false); // Chiudi il modulo di modifica
  };

  return (
    <div className="main-container">
      <div className="tab-container">
        <button className="tab-button">Anagrafica</button>
        <button className="tab-button">Obiettivi</button>
        <button className="tab-button">Feedback</button>
      </div>
      <div className="content-container">
        <div className="profile-container">
          <div className="avatar-placeholder">
            <img src="/Media/areaUtente.png" alt="" />
          </div>
          <div className="profile-info">
            {!isEditing ? (
              <>
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
              </>
            ) : (
              <>
                <div className="profile-row">
                  <span>Nome:</span>
                  <input
                    type="text"
                    name="nome"
                    value={userData.nome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="profile-row">
                  <span>Cognome:</span>
                  <input
                    type="text"
                    name="cognome"
                    value={userData.cognome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="profile-row">
                  <span>Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="profile-row">
                  <span>Quiz Superati:</span>
                  <input
                    type="number"
                    name="quiz_superati"
                    value={userData.quiz_superati}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="button-container">
          {!isEditing ? (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Modifica dati
            </button>
          ) : (
            <>
              <button className="save-button" onClick={handleSave}>
                Salva
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Annulla
              </button>
            </>
          )}
          {!isEditing && (
            <Link href="/homepage">
              <button className="home-button">Torna alla home</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
