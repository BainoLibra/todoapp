import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        📋 To-Do App
      </Link>
      <div className="navbar-right">
        {user && <span className="user-info">👤 {user.username}</span>}
        {user
          ? <button onClick={logout} className="logout-button">Logout</button>
          : <Link to="/login" className="login-link">Login</Link>}
      </div>
    </nav>
  );
}
