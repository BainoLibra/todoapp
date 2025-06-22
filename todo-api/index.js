const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory to-do list
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a To-Do App', completed: true }
];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get a single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');

  todo.title = req.body.title !== undefined ? req.body.title : todo.title;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Todo API running at http://localhost:${port}`);
});
