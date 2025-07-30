@echo off
echo ========================================
echo    VirtualLab Docker Deployment
echo ========================================
echo.

echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not running!
    echo.
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    echo After installation, make sure Docker Desktop is running.
    echo.
    pause
    exit /b 1
)

echo ✅ Docker is available
echo.

echo Building and starting VirtualLab containers...
echo This may take a few minutes on first run...
echo.

docker-compose down 2>nul
docker-compose up --build -d

if %errorlevel% equ 0 (
    echo.
    echo ✅ VirtualLab deployed successfully!
    echo.
    echo 🌐 Frontend: http://localhost:3000
    echo 🔧 Backend:  http://localhost:5000
    echo.
    echo To check logs: docker-compose logs -f
    echo To stop:      docker-compose down
    echo.
) else (
    echo.
    echo ❌ Deployment failed! Check the logs above.
    echo.
)

pause
