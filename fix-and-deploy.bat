@echo off
echo ========================================
echo  Fixing Port Conflicts and Restarting
echo ========================================
echo.

echo Stopping any existing Docker containers...
docker-compose down 2>nul

echo.
echo Checking for processes using port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    echo Killing process on port 5000 with PID: %%a
    taskkill /f /pid %%a 2>nul
)

echo.
echo Checking for processes using port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    echo Killing process on port 3000 with PID: %%a
    taskkill /f /pid %%a 2>nul
)

echo.
echo Waiting 3 seconds for ports to be released...
timeout /t 3 /nobreak >nul

echo.
echo Starting VirtualLab containers...
docker-compose up -d

if %errorlevel% equ 0 (
    echo.
    echo ✅ VirtualLab deployed successfully!
    echo.
    echo 🌐 Frontend: http://localhost:3000
    echo 🔧 Backend:  http://localhost:5000
    echo.
    echo To view logs: docker-compose logs -f
    echo To stop:     docker-compose down
    echo.
) else (
    echo.
    echo ❌ Deployment failed! Try running manually:
    echo    docker-compose down
    echo    docker-compose up
    echo.
)

pause
