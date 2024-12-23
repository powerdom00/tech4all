import React, { useState } from "react";
import "../css/Header.css";
import Link from "next/link";
import { useAuth } from "../../../pages/context/AuthContext"; // Importa il contesto

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // Usa il contesto per ottenere l'utente e la funzione logout
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Stato per il menu a tendina

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev); // Toggle della visibilità del menu a tendina
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/Media/LogoT4A.jpeg" alt="Logo" />
      </div>
      <div className="search-bar-container">
        <input type="text" placeholder="Cerca..." className="search-bar" />
      </div>
      <nav>
        <ul>
          {!user ? (
            <li>
              <Link href="/login">Login</Link>
            </li>
          ) : (
            <li>
              <div className="user-avatar-container" onClick={toggleDropdown}>
                <img
                  src={"/Media/icona.png"} // Mostra l'immagine dell'utente o una di default
                  alt="User Avatar"
                  className="user-avatar" // Aggiungi una classe per lo stile
                />
                {isDropdownVisible && (
                  <div className="dropdown-menu">
                    <Link href="/areaUtente">
                      <button style={{ color: "black" }}>
                        Visualizza area personale
                      </button>
                    </Link>
                    <button style={{ color: "black" }} onClick={logout}>
                      Esci
                    </button>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
