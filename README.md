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
