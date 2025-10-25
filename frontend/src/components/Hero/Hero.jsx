import React, { useState } from "react";
import styles from "./Hero.module.css";
import heroBg from "../../assets/hero-bg.png";
import Button from "../Button/Button";
import { FaArrowDown, FaSearch } from "react-icons/fa";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("Please enter a keyword to search assignments.");
      return;
    }
    alert(`Searching for: ${searchTerm}`);
    setSearchTerm("");
  };

  const scrollToSection = () => {
    window.scrollTo({ top: 700, behavior: "smooth" });
  };

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>
            Empowering Students with the{" "}
            <span className={styles.highlight}>Internshala Portal</span>
          </h1>
          <p>
            Submit assignments, collaborate with peers, and track your academic
            progress — all in one seamless platform.
          </p>

          {/* Search bar */}
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search assignments or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {/* CTA Buttons */}
          <div className={styles.buttonGroup}>
            <Button
              label="Submit Assignment"
              type="primary"
              onClick={() => alert("Redirect to assignment submission page")}
            />
            <Button
              label="View Submissions"
              type="outline"
              onClick={() => scrollToSection()}
            />
          </div>

          {/* Scroll Down Button */}
          <button className={styles.scrollBtn} onClick={scrollToSection}>
            <FaArrowDown />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
