@echo off
echo Starting VirtualLab Application...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Development Server...
start "Frontend Dev Server" cmd /k "cd frontend && npm run dev"

echo.
echo VirtualLab is starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul
