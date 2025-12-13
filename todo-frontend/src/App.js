import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import TodoList from './components/Todos/TodoList';


export default function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { username: JSON.parse(atob(token.split('.')[1])).username } : null;
  });

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={user ? <h2 style={{ padding: '2rem' }}>Welcome!</h2> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/todos" element={user ? <TodoList /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}
