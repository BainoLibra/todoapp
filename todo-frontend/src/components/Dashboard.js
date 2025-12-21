import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import StatCard from './StatCard';
import TodoItem from './TodoItem';
import './Dashboard.css';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('personal');
  const [newPriority, setNewPriority] = useState('medium');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTodos();
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch todos');
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await api.post('/todos', {
        title: newTodo,
        category: newCategory,
        priority: newPriority
      });
      setTodos([response.data, ...todos]);
      setNewTodo('');
      setNewCategory('personal');
      setNewPriority('medium');
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await api.put(`/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <h1>Dashboard</h1>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Todos"
          value={totalTodos}
          icon="📋"
          color="primary"
        />
        <StatCard
          title="Completed"
          value={completedTodos}
          icon="✅"
          color="success"
        />
        <StatCard
          title="Pending"
          value={pendingTodos}
          icon="⏳"
          color="warning"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon="📊"
          color="danger"
        />
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <h3>Progress</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
        </div>
      </div>

      {/* Quick Add Todo */}
      <div className="quick-add">
        <h3>Quick Add Todo</h3>
        <form onSubmit={addTodo} className="add-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo..."
            className="add-input"
          />

          <div className="form-row">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="add-select"
            >
              <option value="personal">👤 Personal</option>
              <option value="work">💼 Work</option>
              <option value="health">🏥 Health</option>
              <option value="learning">📚 Learning</option>
            </select>

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="add-select"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <button type="submit" className="add-button">
            Add Todo
          </button>
        </form>
      </div>

      {/* Recent Todos */}
      <div className="todos-section">
        <h3>Recent Todos</h3>
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add your first todo above!</p>
        ) : (
          <div className="todos-list">
            {todos.slice(0, 10).map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
