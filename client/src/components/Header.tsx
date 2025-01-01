import React, { useState } from "react";
import "../css/Header.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importa il router corretto per l'App Router
import { useAuth } from "../../pages/context/AuthContext"; // Importa il contesto

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // Usa il contesto per ottenere l'utente e la funzione logout
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Stato per il menu a tendina
  const router = useRouter(); // Usa il router di next/navigation

  const handleLogout = () => {
    logout(); // Esegui il logout
    router.push("/"); // Reindirizza alla home (localhost:3000)
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev); // Toggle della visibilità del menu a tendina
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/Media/LogoT4A.jpeg" alt="Logo" />
      </div>
      <nav className="nav-container">
        {user && (
          <div className="search-bar-container">
            <input type="text" placeholder="Cerca..." className="search-bar" />
          </div>
        )}

        <ul className="nav-links">
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
                    {user.ruolo ? ( // Se l'utente è amministratore
                      <Link href="/areaAmministratore">
                        <button style={{ color: "black" }}>
                          Visualizza Area Amministratore
                        </button>
                      </Link>
                    ) : (
                      <Link href="/areaUtente">
                        <button style={{ color: "black" }}>
                          Visualizza Area Personale
                        </button>
                      </Link>
                    )}
                    <button style={{ color: "black" }} onClick={handleLogout}>
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
