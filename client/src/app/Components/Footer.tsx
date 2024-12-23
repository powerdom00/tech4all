import React from "react";
import "../css/Footer.css";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; 2024 Tech4All</p>
      <Link href="/chisiamo">
        <p>Chi siamo</p>
      </Link>
    </footer>
  );
};

export default Footer;