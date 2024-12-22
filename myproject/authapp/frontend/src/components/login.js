import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For redirection
import axios from "axios";
import "./login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { username, password };
    setLoading(true); // Start loading state

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Login successful! Redirecting...");

      // Save the token into localStorage
      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        // After successful login, redirect to dashboard
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setMessage(
        error.response
          ? error.response.data.detail || "Invalid credentials. Please try again."
          : "An error occurred during login."
      );
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="login-page">
      <main className="login-content">
        <h2 className="login-heading">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Input */}
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="login-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="login-input"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Message Display */}
          {message && <p className="login-message">{message}</p>}

          {/* Signup Link */}
          <div className="signup-option">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
