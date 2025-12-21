# Todo App Frontend

A modern, professional React Single Page Application (SPA) for managing personal todo lists. This frontend provides a beautiful, responsive interface for users to create, view, update, and delete their todos with real-time synchronization.

## 🎯 Project Overview

This is the frontend component of a full-stack todo application that consists of:
- **Backend API** (Node.js + Express + SQLite) - Handles data persistence and user authentication
- **Frontend SPA** (React) - Provides the user interface and user experience

The application features user authentication, allowing multiple users to maintain their own private todo lists securely.

## ✨ Features

### User Management
- 🔐 User registration and login
- 👤 Secure JWT-based authentication
- 🚪 Logout functionality
- 🔒 Protected routes and API endpoints

### Todo Management
- 📝 Create new todos with quick-add functionality
- ✅ Mark todos as complete/incomplete
- 🗑️ Delete todos
- 📊 Real-time statistics dashboard
- 📈 Progress tracking with visual indicators
- 🔄 Live updates without page refresh

### User Experience
- 🎨 Modern, professional design with custom CSS
- 📱 Fully responsive design (mobile-friendly)
- ⚡ Fast, smooth interactions with loading states
- 🎯 Intuitive navigation and user feedback
- 🌈 Beautiful gradients, shadows, and animations

## 🏗️ Project Structure

```
todo-frontend/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # Search engine crawling rules
├── src/
│   ├── api/
│   │   └── axios.js        # Axios configuration with auth interceptor
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js    # User login form component
│   │   │   └── Register.js # User registration form component
│   │   ├── Todos/
│   │   │   ├── AddTodo.js  # Form for creating new todos
│   │   │   └── TodoList.js # List view of all user todos
│   │   ├── Dashboard.js    # Main dashboard with stats and quick actions
│   │   └── Navbar.js       # Navigation bar with branding and user info
│   ├── App.css             # Global app styles (imported in App.js)
│   ├── App.js              # Main app component with routing
│   ├── App.test.js         # React testing library tests
│   ├── index.css           # Global CSS styles and utilities
│   ├── index.js            # React app entry point
│   ├── logo.svg            # React logo (unused)
│   ├── reportWebVitals.js  # Performance monitoring
│   └── setupTests.js       # Test configuration
├── package.json            # Dependencies and scripts
├── package-lock.json       # Exact dependency versions
└── README.md               # This file
```

## 📁 File Descriptions

### Core Files
- **`src/index.js`** - Entry point that renders the React app into the DOM
- **`src/App.js`** - Main application component with routing logic and authentication state
- **`src/api/axios.js`** - Configured Axios instance with JWT authentication interceptor

### Components
- **`Dashboard.js`** - Professional dashboard with statistics cards, progress bar, and quick-add functionality
- **`Navbar.js`** - Responsive navigation bar with gradient styling and user controls
- **`Auth/Login.js`** - Clean login form with validation and error handling
- **`Auth/Register.js`** - User registration form with success feedback
- **`Todos/TodoList.js`** - Comprehensive todo list with toggle and delete actions
- **`Todos/AddTodo.js`** - Dedicated form for creating new todos

### Styling
- **`index.css`** - Global styles, typography, and utility classes
- **`App.css`** - App-specific styles (currently minimal)
- **`components/*.css`** - Component-specific styles for professional appearance

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing for SPA navigation

### HTTP Client
- **Axios** - Promise-based HTTP client with request/response interceptors

### Styling
- **Custom CSS** - Professional, responsive design with modern CSS features
- **CSS Modules** - Component-scoped styling for maintainability
- **CSS Grid & Flexbox** - Modern layout techniques

### Development Tools
- **Create React App** - Zero-configuration React application setup
- **ESLint** - Code linting and style enforcement
- **React Testing Library** - Component testing utilities

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x
- Backend API running (see root README.md)

### Installation

1. **Clone and navigate to frontend directory:**
   ```bash
   cd todo-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3001 (React dev server)
   - API: http://localhost:3000 (proxied through frontend)

### Available Scripts

```bash
npm start      # Start development server
npm run build  # Create production build
npm test       # Run test suite
npm run eject  # Eject from Create React App (irreversible)
```

## 🔧 Configuration

### API Proxy
The frontend is configured to proxy API requests to the backend:
```json
// package.json
{
  "proxy": "http://localhost:3000"
}
```
This allows API calls to `/api/*` to be forwarded to the backend server.

### Environment Variables
For production deployment, create environment files:
- `.env.development` - Development configuration
- `.env.production` - Production configuration

## 🔐 Authentication Flow

1. **Registration/Login** - User submits credentials
2. **Token Storage** - JWT token stored in localStorage
3. **API Requests** - Axios interceptor adds Authorization header
4. **Route Protection** - Authenticated routes check for valid token
5. **Logout** - Token removed, user redirected to login

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#007bff` (buttons, links, focus states)
- **Success Green**: `#28a745` (completed todos, success messages)
- **Danger Red**: `#dc3545` (delete actions, error messages)
- **Warning Yellow**: `#ffc107` (pending todos)
- **Neutral Gray**: `#6c757d` (text, borders)

### Typography
- **Primary Font**: System font stack for optimal performance
- **Headings**: Light weight (300) for modern appearance
- **Body Text**: Standard weight (400-500) for readability

### Components
- **Border Radius**: 8px-12px for modern, friendly appearance
- **Shadows**: Subtle box-shadows for depth and hierarchy
- **Transitions**: 0.2s ease for smooth interactions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: > 768px - Full grid layouts and side-by-side elements
- **Mobile**: ≤ 768px - Stacked layouts and touch-friendly sizing

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Tests are written using React Testing Library and cover:
- Component rendering
- User interactions
- API integration
- Authentication flows

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `build/` directory.

### Deployment Options
- **Netlify** - Drag & drop the build folder
- **Vercel** - Connect GitHub repository
- **AWS S3 + CloudFront** - Static hosting with CDN
- **Docker** - Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of a full-stack todo application. See the root README.md for complete project information and licensing.

## 🙋 Support

For questions or issues:
1. Check the root README.md for backend setup
2. Review the browser console for errors
3. Ensure both frontend and backend servers are running
4. Verify API endpoints are accessible

---

**Note**: This frontend requires the backend API to be running. See the root directory README.md for complete setup instructions.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
