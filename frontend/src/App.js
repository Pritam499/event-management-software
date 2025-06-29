import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { getCurrentUser } from "./services/auth";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  // still checking token…
  if (user === undefined) return null;

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/login"  element={<Login  onLogin={setUser}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*"        element={<Navigate to="/login"/>} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard user={user} onLogout={() => setUser(null)} />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
