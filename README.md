# VirtualLab Deployment Guide

## Prerequisites

- Docker Desktop (Required for production deployment)
- Node.js (v14 or higher) - For development only
- MongoDB Atlas connection (already configured)
- **Windows Server**: Administrator privileges required

## 🐳 Docker Deployment

### Windows Server Deployment (Recommended for Production)

1. **Right-click PowerShell** and select **"Run as Administrator"**
2. **Navigate to project directory:**
   ```powershell
    cd C:\path\to\VirtualLab
   ```
3. **Run the deployment script:**
   ```powershell
   .\Deploy-WindowsServer.ps1
   ```

### Alternative Windows Server Deployment

1. **Run as Administrator:**
   ```cmd
   deploy-windows-server.bat
   ```

### Quick Management

- **All-in-one management:** `manage-windows-server.bat`
- **View logs:** `docker-compose -f docker-compose.windows.yml logs -f`
- **Stop services:** `docker-compose -f docker-compose.windows.yml down`

## 🐳 Docker Deployment (Other Platforms)

### Quick Start with Docker

1. **Install Docker Desktop** from https://www.docker.com/products/docker-desktop
2. **Start Docker Desktop** and ensure it's running
3. **Deploy the application:**
   ```bash
   # Simply double-click this file:
   deploy-docker.bat
   ```

### Manual Docker Commands

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🛠️ Development Setup (Alternative)

### Option 1: Use the Batch File

1. Double-click `start-app.bat` to start both servers automatically

### Option 2: Manual Start

1. **Start Backend Server:**

   ```bash
   cd backend
   npm start
   ```

   The backend will run on http://localhost:5000

2. **Start Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## Project Architecture

- **Backend:** Express.js server with MongoDB Atlas, Socket.IO for real-time features
- **Frontend:** React application with Vite, TailwindCSS, served by Nginx
- **Code Execution:** Docker container with multi-language support (C++, Java, Python, JavaScript, Go, Ruby)
- **Deployment:** Docker Compose for orchestration

## Environment Configuration

- Backend `.env` file configured with MongoDB Atlas connection
- Frontend environment variables for API endpoints
- Docker environment variables for production deployment

## Features

- Student/Faculty/Admin authentication
- Real-time collaborative code editor with Socket.IO
- Lab management system
- Multi-language code execution environment (C++, C, Python, Java, JavaScript, Go, Ruby, Bash)
- Docker-based secure code execution

## Docker Services

- **Backend Container:** Node.js with development tools and compilers
- **Frontend Container:** Nginx serving the React build
- **Network:** Internal Docker network for service communication

## Management Scripts

- `deploy-docker.bat` - Deploy the entire application
- `stop-docker.bat` - Stop and cleanup containers
- `logs-docker.bat` - View container logs
- `start-app.bat` - Development mode (non-Docker)

## Troubleshooting

### Docker Issues

1. **Docker not installed:** Install Docker Desktop from official website
2. **Port conflicts:** Ensure ports 3000 (frontend) and 5000 (backend) are available
3. **Container build fails:** Check Docker Desktop is running and has sufficient resources

### Development Issues

1. **Port conflicts:** Make sure ports 5000 (backend) and 5173 (frontend) are available
2. **MongoDB connection:** The app uses MongoDB Atlas, ensure internet connection
3. **Dependencies:** Run `npm install` in both backend and frontend directories if needed

## Access the Application

### Production (Docker)

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/v1

### Development

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/v1
