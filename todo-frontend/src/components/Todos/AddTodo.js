import React, { useState } from 'react';
import api from '../../api/axios';
import './AddTodo.css';

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
    <div className="add-todo-container">
      <h2 className="add-todo-title">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="add-todo-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Todo Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Todo</button>
      </form>
      {error && <div className="message error-message">{error}</div>}
      {success && <div className="message success-message">{success}</div>}
    </div>
  );
}

export default AddTodo;