import React from "react";
import styles from "./Button.module.css";

/**
 * Reusable Button Component
 * 
 * Props:
 * - label (string): Text shown inside the button
 * - onClick (function): Click handler
 * - type (string): "primary" | "secondary" | "outline" (default: "primary")
 * - size (string): "small" | "medium" | "large" (default: "medium")
 * - disabled (boolean): Disable the button
 */
const Button = ({ label, onClick, type = "primary", size = "medium", disabled = false }) => {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
