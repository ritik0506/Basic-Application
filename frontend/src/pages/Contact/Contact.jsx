import React, { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // placeholder - hook to API later
    setSent(true);
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSent(false);
      alert("Message sent (demo).");
    }, 800);
  };

  return (
    <section className="section">
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.info}>
            <h2>Contact Us</h2>
            <p className={styles.muted}>Questions? Feature requests? Send a message.</p>
            <p><strong>Email:</strong> support@internshala.local</p>
          </div>

          <form onSubmit={submit} className={styles.form}>
            <input name="name" placeholder="Your name" value={form.name} onChange={change} required />
            <input name="email" type="email" placeholder="Email address" value={form.email} onChange={change} required />
            <textarea name="message" rows="6" placeholder="Message" value={form.message} onChange={change} required />
            <button type="submit" className={styles.btn} disabled={sent}>{sent ? "Sending..." : "Send Message"}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
