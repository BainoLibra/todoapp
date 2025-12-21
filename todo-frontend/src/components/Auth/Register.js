import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post('/register', form);
      setMsg('Registered! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      {msg && <div style={{ background: '#d4edda', color: '#155724', padding: '0.75rem', borderRadius: '6px', border: '1px solid #c3e6cb', marginBottom: '1rem', textAlign: 'center' }}>{msg}</div>}
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
        <button type="submit" className="auth-button">Register</button>
      </form>
      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
