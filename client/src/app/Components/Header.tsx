import React from 'react';
import '../css/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src="Media/LogoT4A.jpeg" alt="Logo" />

      </div>
      <nav>
        <ul>
          {/* <li><a href="/">Catalogo</a></li> */}
          <span></span>
          <li><a href="/">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
