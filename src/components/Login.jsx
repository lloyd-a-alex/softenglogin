// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import qmulEECS from '../assets/qmul-eecs.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Module organiser');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanedEmail = email.trim().toLowerCase();
    if (!cleanedEmail.endsWith('@qmul.ac.uk')) {
      setError("That email doesn’t look like a QMUL one.");
      return;
    }

    if (password !== 'password123') {
      setError('Wrong password. (its password123)');
      return;
    }

    if (role === 'Module organiser') {
      navigate('/module-organiser');
      return;
    }

    setError('you add role page for other roles');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={qmulEECS} alt="QMUL Logo" className="qmul-logo" />
        <h1>Welcome to the</h1>
        <h2>EECS Support System</h2>
      </div>
      <div className="login-right">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="e.g. ec24430@qmul.ac.uk" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Student</option>
                <option>Module organiser</option>
                <option>Lab staff</option>
              </select>
            </div>
            {error && <p className="login-error">{error}</p>}
            <button type="submit">Login</button>
            <button
              type="button"
              className="forgot-link"
              onClick={() => setError('idk how to do this.')}
            >
              Forgot password?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
