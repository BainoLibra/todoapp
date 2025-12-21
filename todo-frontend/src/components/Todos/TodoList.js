import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
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

  if (loading) return <div style={{ padding: '2rem' }}>Loading todos...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Todos</h2>
      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
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
  );
}

export default TodoList;
