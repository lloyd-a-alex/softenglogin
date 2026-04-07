import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import qmulEECS from '../assets/qmul-eecs.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in user:', email);
    // Temporary bypass directly to the Module Organiser dashboard for the prototype
    navigate('/module-organiser');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={qmulEECS} alt="QMUL Logo" className="qmul-logo" />
        <h1>Welcome to the</h1>
        <h2>EECS support system</h2>
      </div>
      <div className="login-right">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>email</label>
              <input type="email" placeholder="e.g. ec24430@qmul.ac.uk" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
