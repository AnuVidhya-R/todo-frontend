import { useState } from 'react';
import { MdAccountCircle, MdPersonAdd } from 'react-icons/md';

export default function Register({ onRegister, onNavigateToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        onRegister(data.username); // Auto login
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Server is unavailable. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-avatar-bg">
          <MdPersonAdd className="login-avatar" />
        </div>
        <h2>Create Account</h2>
        <p className="login-subtitle">Sign up to manage your To-Do List</p>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group-vertical">
          <label htmlFor="reg-username">Username</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder="Choose a username"
            autoFocus
          />
        </div>

        <div className="input-group-vertical">
          <label htmlFor="reg-password">Password</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Create a password"
          />
        </div>

        <div className="input-group-vertical">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
            placeholder="Confirm your password"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="btn btn-primary login-btn">
          Sign Up
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: 'var(--muted-text)', fontSize: '0.95rem' }}>
            Already have an account?{' '}
          </span>
          <button 
            type="button" 
            onClick={onNavigateToLogin}
            style={{
              background: 'none', border: 'none', color: 'var(--primary-color)', 
              fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem',
              textDecoration: 'underline'
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
