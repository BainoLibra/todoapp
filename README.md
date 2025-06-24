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

