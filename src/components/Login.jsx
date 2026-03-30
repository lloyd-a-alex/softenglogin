import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-left">
        {/* Logo png will go here later */}
        <h1>Welcome to the</h1>
        <h2>EECS support system</h2>
      </div>

      <div className="login-right">
        <div className="form-container">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <label>email</label>
              <input type="email" placeholder="e.g. ec24430@qmul.ac.uk" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;