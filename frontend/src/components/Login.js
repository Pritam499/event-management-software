import React, { useState } from "react";
import { login } from "../services/auth";
import { Link } from "react-router-dom";
import "../App.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      onLogin(user);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="card">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="12345678"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="link-text">
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
