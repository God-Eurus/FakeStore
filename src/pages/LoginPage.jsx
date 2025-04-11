import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/fakeStoreApi';
import '../styles/LoginPage.css'; // Add styles

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // --- FAKE STORE API LOGIN ---
      // Default credentials from docs: username: mor_2314, password: 83r5^_
      // You might want to pre-fill these or use different ones if needed
      const data = await loginUser(username, password);

      if (data.token) {
        onLoginSuccess(data.token); // Call function from App to update auth state & store token
        navigate('/'); // Redirect to home page on successful login
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
       setError(err.message || 'Login failed. Please try again.'); // Show API error or generic message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="mor_2314" // Example user
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="83r5^_" // Example password
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;