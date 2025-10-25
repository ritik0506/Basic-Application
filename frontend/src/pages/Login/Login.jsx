import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login. Later connect to API.
    setTimeout(() => {
      login({ email: form.email, name: "Student Demo" });
      setLoading(false);
      navigate("/");
    }, 700);
  };

  return (
    <section className="section">
      <div className="container">
        <div className={styles.card}>
          <h3>Sign in</h3>
          <form onSubmit={submit} className={styles.form}>
            <input name="email" value={form.email} onChange={change} placeholder="Email" required />
            <input name="password" type="password" value={form.password} onChange={change} placeholder="Password" required />
            <button className={styles.btn} disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          </form>
          <p className={styles.small}>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
