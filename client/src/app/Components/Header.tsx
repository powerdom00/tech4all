import React from 'react';
import '../css/Header.css'; // Assicurati che il percorso sia corretto
import Link from 'next/link'; // Importa Link da Next.js

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/Media/LogoT4A.jpeg" alt="Logo" /> {/* Verifica il percorso dell'immagine */}
      </div>
      <nav>
        <ul>
          {/* Aggiungi altri link se necessario */}
          <li>
            <Link href="/login"> {/* Usa Link per Next.js */}
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
