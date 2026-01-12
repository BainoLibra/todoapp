const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const SECRET_KEY = 'your_secret_key'; // Replace with an environment variable in production

app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to the todos database.');
});

// Create tables
db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  category TEXT DEFAULT 'personal',
  priority TEXT DEFAULT 'medium',
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
)`);

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

// -------------------- AUTH --------------------

// Register a new user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, username });
  });
});

// Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
});

// -------------------- AUTH MIDDLEWARE --------------------

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// -------------------- TODO ROUTES --------------------

// Get all todos (protected)
app.get('/api/todos', authenticateToken, (req, res) => {
  db.all('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC', [req.user.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get a single todo
app.get('/api/todos/:id', authenticateToken, (req, res) => {
  db.get('SELECT * FROM todos WHERE id = ? AND user_id = ?', [req.params.id, req.user.userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).send('Todo not found');
    res.json(row);
  });
});

// Add a new todo
app.post('/api/todos', authenticateToken, (req, res) => {
  const { title, category = 'personal', priority = 'medium' } = req.body;
  db.run('INSERT INTO todos (title, category, priority, user_id) VALUES (?, ?, ?, ?)',
    [title, category, priority, req.user.userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      title,
      completed: 0,
      category,
      priority,
      user_id: req.user.userId
    });
  });
});

// Update a todo
app.put('/api/todos/:id', authenticateToken, (req, res) => {
  const { title, completed, category, priority } = req.body;
  db.run(
    'UPDATE todos SET title = ?, completed = ?, category = ?, priority = ? WHERE id = ? AND user_id = ?',
    [title, completed, category, priority, req.params.id, req.user.userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).send('Todo not found');
      res.json({ id: req.params.id, title, completed, category, priority });
    }
  );
});

// Delete a todo
app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM todos WHERE id = ? AND user_id = ?', [req.params.id, req.user.userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).send('Todo not found');
    res.status(204).send();
  });
});

// -------------------- START SERVER --------------------

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});
app.listen(port, () => {
  console.log(`Todo API with auth running at http://localhost:${port}`);
});
