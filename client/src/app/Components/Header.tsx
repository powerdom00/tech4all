import React, { useState } from "react";
import "../css/Header.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../pages/context/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/Media/LogoT4A.jpeg" alt="Logo" />
      </div>
      <nav>
        <ul>
          {!user ? (
            <li>
              <Link href="/login" className="login-button">
                Login
              </Link>
            </li>
          ) : (
            <li className="user-section">
              <div
                className="user-avatar-container"
                onClick={toggleDropdown}
              >
                <img
                  src={"/Media/icona.png"}
                  alt="User Avatar"
                  className="user-avatar"
                />
                {isDropdownVisible && (
                  <div className="dropdown-menu">
                    {user.ruolo === "admin" ? (
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
                    <button
                      style={{ color: "black" }}
                      onClick={handleLogout}
                    >
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
