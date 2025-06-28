import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">📋 To‑Do</Link>
      <div>
        {user && <span className="mr-4">👤 {user.username}</span>}
        {user
          ? <button onClick={logout} className="bg-indigo-800 px-3 py-1 rounded">Logout</button>
          : <Link to="/login" className="underline">Login</Link>}
      </div>
    </nav>
  );
}
