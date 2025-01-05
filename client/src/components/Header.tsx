import React, { useState } from "react";
import styles from "../css/Header.module.css";
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
          `http://localhost:5000/tutorials/search?parolaChiave=${encodeURIComponent(
            query
          )}`
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
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/Media/LogoT4A.jpeg" alt="Logo" />
      </div>
      <nav className={styles.navContainer}>
        {user && (
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              placeholder="Cerca..."
              className={styles.searchBar}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)} // Aggiorna la ricerca dinamicamente
            />
            {searchResults.length > 0 && (
              <div className={styles.searchDropdown}>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className={styles.searchResultItem}
                    onClick={() => handleResultClick(result.id)}
                  >
                    <div className={styles.searchResultIcon}>🔍</div>
                    <span className={styles.searchResultTitle}>
                      {result.titolo}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <ul className={styles.navLinks}>
          {!user ? (
            <li>
              <Link href="/login">Login</Link>
            </li>
          ) : (
            <li>
              <div
                className={styles.userAvatarContainer}
                onClick={toggleDropdown}
              >
                <img
                  src={"/Media/icona.png"}
                  alt="User Avatar"
                  className={styles.userAvatar}
                />
                {isDropdownVisible && (
                  <div className={styles.dropdownMenu}>
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
