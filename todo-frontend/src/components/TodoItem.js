import React from 'react';
import './TodoItem.css';

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit
}) => {
  const handleToggle = () => {
    onToggle(todo.id, todo.completed);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="todo-checkbox"
      />

      <div className="todo-content">
        <h4 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </h4>

        <div className="todo-meta">
          <span className={`todo-category todo-category--${todo.category || 'personal'}`}>
            {todo.category || 'personal'}
          </span>
          <span className={`todo-priority todo-priority--${todo.priority || 'medium'}`}>
            {todo.priority || 'medium'}
          </span>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="delete-button"
        aria-label="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
};

export default TodoItem;