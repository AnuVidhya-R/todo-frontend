import { useState } from 'react';
import { MdLogin, MdAccountCircle } from 'react-icons/md';

export default function Login({ onLogin, onNavigateToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      try {
        const res = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.trim(), password: password.trim() })
        });
        
        const data = await res.json();
        
        if (res.ok) {
          onLogin(data.username);
        } else {
          setError(data.error || 'Invalid username or password. Please try again or register.');
        }
      } catch (err) {
        console.error(err);
        setError('Server is unavailable. Please try again later.');
      }
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-avatar-bg">
          <MdAccountCircle className="login-avatar" />
        </div>
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please log in to access your To-Do List</p>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group-vertical">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder="Enter any username"
            autoFocus
          />
        </div>
        <div className="input-group-vertical">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter any password"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="btn btn-primary login-btn">
          <MdLogin size={20} />
          Login
        </button>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: 'var(--muted-text)', fontSize: '0.95rem' }}>
            Don't have an account?{' '}
          </span>
          <button 
            type="button" 
            onClick={onNavigateToRegister}
            style={{
              background: 'none', border: 'none', color: 'var(--primary-color)', 
              fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem',
              textDecoration: 'underline'
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
