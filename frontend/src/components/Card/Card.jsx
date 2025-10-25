import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, desc }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>Learn More</button>
    </div>
  );
};

export default Card;
