import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import "../src/app/css/AreaUtente.css";
import Link from "next/link";

const UserPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState({
    id: 0,
    nome: "",
    cognome: "",
    email: "",
    quiz_superati: 0,
  });
  const [feedbackList, setFeedbackList] = useState<any[]>([]); // Per gestire i feedback ricevuti
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Anagrafica");

  useEffect(() => {
    console.log(user);
    if (user) {
      setUserData({
        id: user.id,
        nome: user.nome || "",
        cognome: user.cognome || "",
        email: user.email || "",
        quiz_superati: user.quizSuperati || 0,
      });
      if (activeTab === "Feedback") {
        fetchUserFeedback(user.id);
      }
    }
  }, [user, activeTab]);

  const fetchUserFeedback = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/feedback/visualizzaFeedbackUtente/${userId}`
      );
      const data = await response.json();

      if (data.success) {
        setFeedbackList(data.Feedback);
      } else {
        setFeedbackList([]);
      }
    } catch (error) {
      console.error("Errore durante il recupero dei feedback:", error);
      setFeedbackList([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUser(userData);
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Anagrafica":
        return (
          <>
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
            <div className="edit-button-container">
              {!isEditing ? (
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
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
            </div>
          </>
        );
      case "Feedback":
        return (
          <div className="feedback-container">
            <h2>Feedback</h2>
            <p>Qui puoi vedere i feedback ricevuti per i quiz completati.</p>
            {feedbackList.length === 0 ? (
              <p>Nessun feedback disponibile.</p>
            ) : (
              <ul>
                {feedbackList.map((feedback, index) => (
                  <li key={index}>
                    <strong>Valutazione:</strong> {feedback.valutazione} <br />
                    <strong>Commento:</strong> {feedback.commento}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "Obiettivi":
        const renderBadge = () => {
          const badges = [
            {
              threshold: 1,
              label: "Livello:Principiante",
              image: "/Media/badge-1.png",
            },
            {
              threshold: 3,
              label: "Livello:Intermedio",
              image: "/Media/badge-2.jpg",
            },
            {
              threshold: 5,
              label: "Livello:Esperto",
              image: "/Media/badge-3.png",
            },
          ];

          const unlockedBadge = badges
            .reverse()
            .find((badge) => user.quizSuperati >= badge.threshold);

          return unlockedBadge ? (
            <div className="badge">
              <img src={unlockedBadge.image} alt={unlockedBadge.label} />
              <p>{unlockedBadge.label}</p>
            </div>
          ) : (
            <p>
              Non hai ancora ottenuto alcun badge. Completa più quiz per
              sbloccarli!
            </p>
          );
        };

        return (
          <div className="goals-container">
            <h2>Obiettivi</h2>
            <p>Completa quiz per ottenere badge esclusivi!</p>
            <div className="legend">
              <h3>Legenda:</h3>
              <ul>
                <li>1 Quiz superato: Primo Badge</li>
                <li>3 Quiz superati: Secondo Badge</li>
                <li>5 Quiz superati: Terzo Badge</li>
              </ul>
            </div>
            <div className="badge-container">{renderBadge()}</div>
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
          className={`tab-button ${activeTab === "Obiettivi" ? "active" : ""}`}
          onClick={() => setActiveTab("Obiettivi")}
        >
          Obiettivi
        </button>
        <button
          className={`tab-button ${activeTab === "Feedback" ? "active" : ""}`}
          onClick={() => setActiveTab("Feedback")}
        >
          Feedback
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

export default UserPage;
