# todoapp
This project is a simple RESTful API for managing a To-Do list, built using Node.js and Express. It allows users to create, read, update, and delete (CRUD) to-do items through HTTP requests.  The app stores data in memory, meaning the data resets when the server restarts. It's a great foundation for learning backend development and can later be extended with a real database and frontend interface.
# To-Do List API

A simple RESTful API for managing to-do tasks, built with Node.js and Express.

## Features
- Get all to-dos
- Get a single to-do by ID
- Add a new to-do
- Update an existing to-do
- Delete a to-do

## Tech Stack
- Node.js
- Express
- npm

## Usage
1. Install dependencies:
npm install

2. Start the server:
npm start

3. API runs at:
http://localhost:3000/api/todos

## Example Request (POST)
```json
{
"title": "Read ECMAScript docs"
}

Usrer Login and Regisration

## 🔐 User Authentication (Login/Register)

The API now supports basic user authentication using `bcrypt` for password hashing and `jsonwebtoken` (JWT) for login tokens.

### 📌 Register a New User
**POST** `/api/register`

**Request Body (JSON):**
```json
{
  "username": "exampleuser",
  "password": "securepassword"
}

Response:
{
  "id": 1,
  "username": "exampleuser"
}

Login Existing User
POST /api/login

Request Body (JSON):
{
  "username": "exampleuser",
  "password": "securepassword"
}

Response:
{
  "token": "your.jwt.token"
}

Use this token to access protected routes by including it in the Authorization header:

Authorization: Bearer your.jwt.token

Example Protected Route
You can protect routes like /api/todos using a JWT middleware.

app.get('/api/todos', authenticateToken, (req, res) => {
  // Only accessible with valid token
});

Dependencies
express

sqlite3 (or better-sqlite3)

bcrypt

jsonwebtoken

---

## 🌐 Frontend (React)

A lightweight React SPA that consumes the API and lets each authenticated user
manage their personal to-do list.

### ⚙️ Prerequisites
| Tool | Version (tested) |
|------|------------------|
| Node | ≥ 18.x |
| npm  | ≥ 9.x |

### 🚀 Quick Start

```bash
# 1. create the project in a sibling folder to the backend
npx create-react-app todo-frontend
cd todo-frontend

# 2. install HTTP & routing helpers
npm install axios react-router-dom

# 3. run the dev server
npm start

The dev server launches at http://localhost:3001 (React’s default).
Requests proxied to http://localhost:3000 hit the Express API, so add this to
todo-frontend/package.json:

// package.json  (frontend)
{
  ...
  "proxy": "http://localhost:3000"
}

Suggested Folder Structure
todo-frontend/
├── public/
├── src/
│   ├── api/            # Axios instance & helpers
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Todo/
│   │   │   ├── TodoList.js
│   │   │   └── TodoItem.js
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── LoginPage.js
│   │   └── RegisterPage.js
│   ├── App.js
│   └── index.js
└── package.json

 Authentication Flow
Register / Login → POST /api/register or /api/login

Receive JWT token → store in localStorage

Axios interceptor attaches token to every request:
Authorization: Bearer <token>

Protected React Route checks token; unauthenticated users are redirected
to /login

Core React Components
| Component            | Responsibility                                |
| -------------------- | --------------------------------------------- |
| `Login` / `Register` | Forms, submits credentials, stores JWT        |
| `Navbar`             | Shows app title, “Logout” button, active user |
| `TodoList`           | Fetches & renders all todos for current user  |
| `TodoItem`           | Edit, toggle ✓, delete individual todo        |
| `App`                | Holds routes and global auth context          |

Axios Helper (src/api/axios.js)
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

Common Scripts
npm start        # Run React dev server
npm run build    # Production build (creates /build)
npm run lint     # Optional: lint source files

Roadmap
Add styling (Bootstrap, Tailwind, MUI, etc.)

Auto-refresh JWT using refresh-tokens

Responsive design for mobile

Toast notifications for CRUD feedback

Tip: Keep backend and frontend in separate terminals so
npm start can run concurrently in both folders during development.
