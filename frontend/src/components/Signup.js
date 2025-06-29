// import React, { useState } from 'react';
// import { register } from '../services/auth';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'employee'
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await register(form.name, form.email, form.password, form.role);
//       setSuccess(true);
//       // redirect to login after 2s
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Signup failed');
//     }
//   };

//   if (success) {
//     return <p>Signup successful! Redirecting to <Link to="/login">login</Link>…</p>;
//   }

//   return (
//     <div className="signup-container">
//       <h2>Register</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={e => setForm({ ...form, password: e.target.value })}
//           required
//         />
//         <select
//           value={form.role}
//           onChange={e => setForm({ ...form, role: e.target.value })}
//         >
//           <option value="employee">Employee</option>
//           <option value="cmo">CMO</option>
//           <option value="ceo">CEO</option>
//         </select>
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>Already have an account? <Link to="/login">Login here</Link>.</p>
//     </div>
//   );
// }




import React, { useState } from "react";
import { register } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password, form.role);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  if (success) {
    return (
      <div className="card">
        <h2>Register</h2>
        <p>Signup successful! Redirecting to <Link to="/login">login</Link>…</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="employee">Employee</option>
            <option value="cmo">CMO</option>
            <option value="ceo">CEO</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="link-text">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}
