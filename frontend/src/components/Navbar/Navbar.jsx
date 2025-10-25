import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.leftSection}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Internshala Portal</h2>
      </div>

      <div className={`${styles.centerSection} ${menuOpen ? styles.open : ""}`}>
        <Link
          to="/"
          className={`${styles.navLink} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${styles.navLink} ${
            location.pathname === "/about" ? styles.active : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/features"
          className={`${styles.navLink} ${
            location.pathname === "/features" ? styles.active : ""
          }`}
        >
          Features
        </Link>
        <Link
          to="/contact"
          className={`${styles.navLink} ${
            location.pathname === "/contact" ? styles.active : ""
          }`}
        >
          Contact
        </Link>
      </div>

      <div className={styles.rightSection}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchBox}
        />
        <button onClick={toggleTheme} className={styles.toggleBtn}>
          {darkMode ? "🌙" : "☀️"}
        </button>
        <Link to="/login" className={styles.loginBtn}>
          Login
        </Link>
        <Link to="/register" className={styles.registerBtn}>
          Register
        </Link>
        <div
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
