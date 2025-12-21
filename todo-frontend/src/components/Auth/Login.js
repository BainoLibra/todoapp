import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Auth.css';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', form);
      localStorage.setItem('token', data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ username: payload.username });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      {error && <div className="auth-error">{error}</div>}
      <form onSubmit={submit} className="auth-form">
        <input
          required
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="auth-input"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="auth-input"
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <div className="auth-link">
        No account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
