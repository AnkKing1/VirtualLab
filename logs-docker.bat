@echo off
echo VirtualLab Container Logs
echo ========================
echo.
echo [1] Backend logs
echo [2] Frontend logs  
echo [3] All logs
echo [4] Follow all logs (live)
echo.
set /p choice="Select option (1-4): "

if "%choice%"=="1" (
    docker-compose logs backend
) else if "%choice%"=="2" (
    docker-compose logs frontend
) else if "%choice%"=="3" (
    docker-compose logs
) else if "%choice%"=="4" (
    echo Press Ctrl+C to stop following logs...
    docker-compose logs -f
) else (
    echo Invalid choice!
)

echo.
pause
