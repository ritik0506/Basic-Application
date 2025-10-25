import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      login({ email: form.email, name: form.name });
      setLoading(false);
      navigate("/");
    }, 900);
  };

  return (
    <section className="section">
      <div className="container">
        <div className={styles.card}>
          <h3>Create account</h3>
          <form onSubmit={submit} className={styles.form}>
            <input name="name" placeholder="Full name" value={form.name} onChange={change} required />
            <input name="email" placeholder="Email" value={form.email} onChange={change} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} required />
            <button className={styles.btn} disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
          </form>
          <p className={styles.small}>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Register;
