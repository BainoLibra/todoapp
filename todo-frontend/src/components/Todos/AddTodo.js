import React, { useState } from 'react';
import api from '../../api/axios';

function AddTodo() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post('/todos', { title });
      setTitle('');
      setSuccess('Todo added successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add todo');
      setSuccess(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Todo Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Todo
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
    </div>
  );
}

export default AddTodo;