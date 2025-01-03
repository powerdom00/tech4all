import React, { useState } from "react";
import "../css/Header.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../pages/context/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  interface SearchResult {
    id: number;
    titolo: string;
  }

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Stato per i risultati di ricerca
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await fetch(
          `http://localhost:5000/tutorials/search?parolaChiave=${encodeURIComponent(query)}`,
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data); // Aggiorna i risultati di ricerca
        }
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      }
    } else {
      setSearchResults([]); // Pulisci i risultati se non c'è input
    }
  };

  const handleResultClick = (id: number) => {
    router.push(`/Contenuto/${id}`); // Naviga al tutorial specifico
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/Media/LogoT4A.jpeg" alt="Logo" />
      </div>
      <nav className="nav-container">
        {user && (
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Cerca..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)} // Aggiorna la ricerca dinamicamente
            />
            {searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(result.id)}
                  >
                    <div className="search-result-icon">🔍</div>
                    <span className="search-result-title">{result.titolo}</span>
                  </div>
                ))}
              </div>
            )}
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
                  src={"/Media/icona.png"}
                  alt="User Avatar"
                  className="user-avatar"
                />
                {isDropdownVisible && (
                  <div className="dropdown-menu">
                    {user.ruolo ? (
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
