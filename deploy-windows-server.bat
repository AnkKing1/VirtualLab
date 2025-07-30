@echo off
echo ========================================
echo   VirtualLab Windows Server Deployment
echo ========================================
echo.

REM Check if running as Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ This script requires Administrator privileges
    echo    Right-click and "Run as Administrator"
    pause
    exit /b 1
)

echo ✅ Running with Administrator privileges
echo.

echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not running!
    echo.
    echo For Windows Server, install Docker using:
    echo   1. Enable Windows Container feature
    echo   2. Install Docker Desktop or Docker Engine
    echo   3. Switch to Linux containers mode
    echo.
    pause
    exit /b 1
)

echo ✅ Docker is available
echo.

echo Checking Docker mode...
docker version | findstr "linux" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Docker appears to be in Windows containers mode
    echo    Switching to Linux containers for this deployment...
    echo    You may need to manually switch in Docker Desktop
    echo.
)

echo Stopping any existing Docker containers...
docker-compose -f docker-compose.windows.yml down 2>nul

echo.
echo Checking for processes using port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 2^>nul') do (
    echo Killing process on port 5000 with PID: %%a
    taskkill /f /pid %%a 2>nul
)

echo.
echo Checking for processes using port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 2^>nul') do (
    echo Killing process on port 3000 with PID: %%a
    taskkill /f /pid %%a 2>nul
)

echo.
echo Configuring Windows Firewall (if needed)...
netsh advfirewall firewall show rule name="VirtualLab-3000" >nul 2>&1
if %errorlevel% neq 0 (
    echo Adding firewall rule for port 3000...
    netsh advfirewall firewall add rule name="VirtualLab-3000" dir=in action=allow protocol=TCP localport=3000
)

netsh advfirewall firewall show rule name="VirtualLab-5000" >nul 2>&1
if %errorlevel% neq 0 (
    echo Adding firewall rule for port 5000...
    netsh advfirewall firewall add rule name="VirtualLab-5000" dir=in action=allow protocol=TCP localport=5000
)

echo.
echo Waiting 3 seconds for ports to be released...
timeout /t 3 /nobreak >nul

echo.
echo Starting VirtualLab containers for Windows Server...
docker-compose -f docker-compose.windows.yml up --build -d

if %errorlevel% equ 0 (
    echo.
    echo ✅ VirtualLab deployed successfully on Windows Server!
    echo.
    echo 🌐 Frontend: http://localhost:3000
    echo 🌐 Frontend (external): http://%COMPUTERNAME%:3000
    echo 🔧 Backend:  http://localhost:5000
    echo 🔧 Backend (external):  http://%COMPUTERNAME%:5000
    echo.
    echo To view logs: docker-compose -f docker-compose.windows.yml logs -f
    echo To stop:     docker-compose -f docker-compose.windows.yml down
    echo.
    echo ℹ️  For external access, ensure Windows Firewall allows connections
) else (
    echo.
    echo ❌ Deployment failed!
    echo.
    echo Windows Server troubleshooting:
    echo 1. Ensure Docker Desktop is in Linux containers mode
    echo 2. Check Windows Defender/Antivirus exclusions
    echo 3. Verify internet connectivity for image downloads
    echo 4. Check available disk space
    echo 5. Run: docker system prune -f
    echo.
)

pause
