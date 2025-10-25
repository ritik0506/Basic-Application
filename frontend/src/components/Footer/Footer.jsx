import React, { useState } from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email address!");
      return;
    }
    alert(`Subscribed successfully with ${email}`);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + Description */}
        <div className={styles.section}>
          <div className={styles.brand}>
            <img src={logo} alt="Internshala Portal Logo" className={styles.logo} />
            <h2>Internshala Portal</h2>
          </div>
          <p className={styles.desc}>
            A unified platform for students to submit assignments, collaborate,
            and track academic progress efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul className={styles.links}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.section}>
          <h3>Subscribe</h3>
          <p>Get updates about new features and announcements.</p>
          <form className={styles.newsletter} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social Icons */}
        <div className={styles.section}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Internshala Portal. All rights reserved.</p>
        <button className={styles.topButton} onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
