// src/Login.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext"; // Import useAuth hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Destructure login from useAuth

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await login(email, password); // Use login function
      const idToken = await userCredential.user.getIdToken();
      console.log("Logged in successfully", idToken);
      // Save token or make a request to backend with the token
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
