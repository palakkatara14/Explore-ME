

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../signup.css";

function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });
      alert("YOU SIGNED SUCCESSFULLY");
      onSignupSuccess();
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="left-side"></div>
      <div className="right-side">
        <div className="App">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="footer">
              <button type="submit" className="btn">Sign Up</button>
              <div className="login-wrapper">
                <p>Already have an account?</p>
                <button type="button" className="btn" onClick={handleLoginClick}>Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

