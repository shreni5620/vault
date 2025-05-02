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

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminName', response.data.name); // Save name
        localStorage.setItem('adminEmail', response.data.email); // <-- yeh line add karo
        // Navigate to admin dashboard
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" }}>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "350px" }}>
          <h2 style={{ textAlign: "center", color: "#2d6cdf", marginBottom: "10px" }}>Admin Login</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>Sign in to your admin account</p>

          {error && <p style={{ color: "#e53e3e", textAlign: "center" }}>{error}</p>}

          <form onSubmit={submitHandler}>
            <label style={{ display: "block", color: "#333", marginBottom: "5px" }}>Email address</label>
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
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "5px", padding: "8px", marginBottom: "20px" }}>
              <span style={{ color: "#999", paddingRight: "5px" }}>🔒</span>
              <input 
                type="password" 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%" }} 
              />
            </div>

            <button type="submit" style={{ width: "100%", backgroundColor: "#2d6cdf", color: "#fff", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;
