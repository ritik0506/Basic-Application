import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.card}>
          <h2>About This Project</h2>
          <p>
            This is a student assignment submission portal UI built with React + Vite.
            It is modular, responsive and ready to connect to a Node + MongoDB backend.
          </p>
          <ul>
            <li>Clean component structure</li>
            <li>Responsive design</li>
            <li>Ready for authentication & API integration</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
