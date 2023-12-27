import { useState } from 'react';
import './Login.scss'; // Import your Sass styles

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission logic here

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='bottom-section'>
        <button type="submit">Login</button>
        <span style={{fontSize: 12 }}>New here? Create Account</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
