import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './Dashboard.css';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
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
      const response = await api.post('/todos', { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
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

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Todos</h3>
          <p>{totalTodos}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTodos}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingTodos}</p>
        </div>
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <p>{completionRate}%</p>
        </div>
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
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>

      {/* Recent Todos */}
      <div className="todos-section">
        <h3>Recent Todos</h3>
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add your first todo above!</p>
        ) : (
          <ul className="todos-list">
            {todos.slice(0, 10).map(todo => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="todo-checkbox"
                />
                <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
