import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import "./signupadmin.css";

const SignupPage = () => {
  // State for form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Call API to submit signup data
      const response = await fetch("http://127.0.0.1:8000/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="signup-page">
      <main className="signup-content">
        <h2 className="signup-heading">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Username */}
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="signup-input"
              required
            />
          </div>

          {/* Password */}
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="signup-input"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="input-container">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="signup-input"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          {/* Message */}
          {message && <p className="signup-message">{message}</p>}

          {/* Login Redirect */}
          <div className="login-option">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
