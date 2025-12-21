import React, { useState, useEffect } from 'react';
import api from '../api/axios';

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

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Dashboard</h1>

      {/* Statistics Cards */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '200px', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Total Todos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{totalTodos}</p>
        </div>
        <div style={{ flex: '1', minWidth: '200px', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Completed</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>{completedTodos}</p>
        </div>
        <div style={{ flex: '1', minWidth: '200px', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Pending</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>{pendingTodos}</p>
        </div>
        <div style={{ flex: '1', minWidth: '200px', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Completion Rate</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>{completionRate}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Progress</h3>
        <div style={{ width: '100%', height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${completionRate}%`, height: '100%', backgroundColor: '#28a745', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>

      {/* Quick Add Todo */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Quick Add Todo</h3>
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo..."
            style={{ flex: '1', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add
          </button>
        </form>
      </div>

      {/* Recent Todos */}
      <div>
        <h3>Recent Todos</h3>
        {todos.length === 0 ? (
          <p>No todos yet. Add your first todo above!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.slice(0, 10).map(todo => (
              <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #eee', borderRadius: '4px', marginBottom: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />
                <span style={{ flex: '1', textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ padding: '0.25rem 0.5rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
