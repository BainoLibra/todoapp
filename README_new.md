# TodoApp 📝

A modern, full-stack todo application with user authentication, dark mode, categories, and priorities. Built with React 19, Express.js, and SQLite.

![Dashboard Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=TodoApp+Dashboard)

## ✨ Features

### 🎯 Core Functionality
- ✅ **User Authentication** - Secure login/register with JWT tokens
- 📋 **Todo Management** - Create, read, update, delete todos
- 👤 **User-Specific Data** - Each user sees only their own todos
- 🔄 **Real-time Updates** - Instant UI updates after CRUD operations

### 🎨 Modern UI/UX
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎭 **Modern Styling** - Clean gradients, shadows, and animations
- ⚡ **Smooth Transitions** - Polished micro-interactions

### 🏷️ Advanced Organization
- 📂 **Categories** - Organize todos by Personal 👤, Work 💼, Health 🏥, Learning 📚
- 🚨 **Priority Levels** - Set Low 🟢, Medium 🟡, or High 🔴 priority
- 📊 **Statistics Dashboard** - Track completion rates and progress
- 📈 **Progress Visualization** - Visual progress bars and completion metrics

### 🧩 Developer Experience
- 🏗️ **Reusable Components** - Modular StatCard and TodoItem components
- 🔧 **RESTful API** - Well-documented backend endpoints
- 💾 **SQLite Database** - Lightweight, file-based storage
- 🔒 **Secure Authentication** - Password hashing with bcrypt

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library with hooks
- **Axios** - HTTP client with interceptors
- **CSS Custom Properties** - Dynamic theming
- **Responsive CSS Grid/Flexbox** - Modern layouts

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todoapp.git
   cd todoapp
   ```

2. **Setup Backend**
   ```bash
   cd todo-api
   npm install
   npm start
   ```
   Backend runs at: http://localhost:3000

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd todo-frontend
   npm install
   npm start
   ```
   Frontend runs at: http://localhost:3001

## 📁 Project Structure

```
todoapp/
├── todo-api/                    # Backend API
│   ├── index.js                 # Main server file
│   ├── package.json
│   └── README.md
├── todo-frontend/               # React SPA
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js         # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Dashboard.js     # Main dashboard component
│   │   │   ├── Navbar.js
│   │   │   ├── StatCard.js      # Reusable statistics component
│   │   │   ├── TodoItem.js      # Reusable todo item component
│   │   │   └── Todos/
│   │   │       ├── AddTodo.js
│   │   │       └── TodoList.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔐 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /api/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Todo Endpoints

All todo endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get All Todos
```http
GET /api/todos
```

**Response:**
```json
[
  {
    "id": 1,
       "title": "Complete project documentation",
    "completed": false,
    "category": "work",
    "priority": "high",
    "user_id": 1,
    "created_at": "2025-12-21T10:30:00.000Z"
  }
]
```

#### Create Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Review pull requests",
  "category": "work",
  "priority": "medium"
}
```

#### Update Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Review pull requests",
  "completed": true,
  "category": "work",
  "priority": "high"
}
```

#### Delete Todo
```http
DELETE /api/todos/:id
```

## 🎨 Component Architecture

### StatCard Component
Reusable component for displaying statistics with icons and color variants.

```jsx
<StatCard
  title="Total Todos"
  value={25}
  icon="📋"
  color="primary"
/>
```

### TodoItem Component
Comprehensive todo item with category badges, priority indicators, and actions.

```jsx
<TodoItem
  todo={todo}
  onToggle={handleToggle}
  onDelete={handleDelete}
/>
```

## 🌙 Dark Mode Implementation

The app uses CSS custom properties for seamless theme switching:

```css
:root {
  --bg-primary: #f8f9fa;
  --text-primary: #2c3e50;
  /* ... light theme variables */
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  /* ... dark theme variables */
}
```

Theme preference is saved in localStorage and applied on app load.

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🔧 Development Scripts

### Backend
```bash
cd todo-api
npm start          # Start development server
npm run dev        # Start with nodemon (if configured)
```

### Frontend
```bash
cd todo-frontend
npm start          # Start React dev server
npm run build      # Create production build
npm test           # Run tests
npm run lint       # Lint code
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Use a production database (PostgreSQL, MySQL)
3. Configure CORS for your frontend domain
4. Set up process manager (PM2, Docker)

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve static files from the `build` folder
3. Configure routing for SPA (client-side routing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React community for excellent documentation
- Express.js for the robust web framework
- SQLite for reliable embedded database
- All contributors and users of this project

---

**Happy Todo-ing! 🎉**