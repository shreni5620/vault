import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/admin/login', { email, password });

      if (response.data.error === false) {
        // Store the token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        // Navigate to admin dashboard
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #bbb;
            opacity: 1;
          }
        `}
      </style>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "350px" }}>
          <h2 style={{ textAlign: "center", color: "#2d6cdf", marginBottom: "10px" }}>Admin Panel</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>Sign in as Administrator</p>

          {error && <p style={{ color: "#f44336", textAlign: "center" }}>{error}</p>}

          <form onSubmit={submitHandler}>
            <label style={{ display: "block", color: "#333", marginBottom: "5px" }}>Admin Email</label>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "5px", padding: "8px", marginBottom: "15px" }}>
              <span style={{ color: "#999", paddingRight: "5px" }}>📧</span>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%" }}
              />
            </div>

            <label style={{ display: "block", color: "#333", marginBottom: "5px" }}>Password</label>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "5px", padding: "8px", marginBottom: "15px" }}>
              <span style={{ color: "#999", paddingRight: "5px" }}>🔒</span>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", color: "#666" }}>
                <input type="checkbox" style={{ marginRight: "5px" }} /> Remember me
              </label>
              <a onClick={() => navigate("/admin/forgotpassword")} style={{ color: "#2d6cdf", textDecoration: "none", cursor: "pointer" }}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" style={{ width: "100%", backgroundColor: "#2d6cdf", color: "#fff", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Admin Sign in
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#666", marginTop: "15px" }}>
            Go back to <a href="/login" style={{ color: "#2d6cdf", textDecoration: "none" }}>User Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;
