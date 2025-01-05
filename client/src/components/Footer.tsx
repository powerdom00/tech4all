import React from "react";
import styles from "../css/Footer.module.css";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Tech4All</p>
    </footer>
  );
};

export default Footer;
