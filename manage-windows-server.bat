@echo off
echo ========================================
echo  VirtualLab Windows Server Management
echo ========================================
echo.
echo [1] Deploy VirtualLab
echo [2] Stop VirtualLab
echo [3] View Logs
echo [4] Restart Services
echo [5] System Cleanup
echo [6] Check Status
echo [7] Configure Firewall
echo [8] Exit
echo.
set /p choice="Select option (1-8): "

if "%choice%"=="1" goto deploy
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto logs
if "%choice%"=="4" goto restart
if "%choice%"=="5" goto cleanup
if "%choice%"=="6" goto status
if "%choice%"=="7" goto firewall
if "%choice%"=="8" goto exit
echo Invalid choice!
pause
goto start

:deploy
echo.
echo Deploying VirtualLab...
call deploy-windows-server.bat
goto start

:stop
echo.
echo Stopping VirtualLab services...
docker-compose -f docker-compose.windows.yml down
echo ✅ Services stopped
pause
goto start

:logs
echo.
echo [1] Backend logs
echo [2] Frontend logs
echo [3] All logs (live)
set /p logchoice="Choose logs (1-3): "
if "%logchoice%"=="1" docker-compose -f docker-compose.windows.yml logs backend
if "%logchoice%"=="2" docker-compose -f docker-compose.windows.yml logs frontend
if "%logchoice%"=="3" docker-compose -f docker-compose.windows.yml logs -f
pause
goto start

:restart
echo.
echo Restarting VirtualLab services...
docker-compose -f docker-compose.windows.yml restart
echo ✅ Services restarted
pause
goto start

:cleanup
echo.
echo Performing system cleanup...
docker-compose -f docker-compose.windows.yml down
docker system prune -f
docker volume prune -f
echo ✅ Cleanup complete
pause
goto start

:status
echo.
echo VirtualLab Status:
echo ==================
docker-compose -f docker-compose.windows.yml ps
echo.
echo Docker System Info:
echo ===================
docker system df
echo.
echo Port Status:
echo ============
netstat -an | findstr ":3000\|:5000"
pause
goto start

:firewall
echo.
echo Configuring Windows Firewall for VirtualLab...
echo.
netsh advfirewall firewall delete rule name="VirtualLab-3000" >nul 2>&1
netsh advfirewall firewall delete rule name="VirtualLab-5000" >nul 2>&1
netsh advfirewall firewall add rule name="VirtualLab-3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="VirtualLab-5000" dir=in action=allow protocol=TCP localport=5000
echo ✅ Firewall rules configured
echo.
echo Frontend accessible on: http://%COMPUTERNAME%:3000
echo Backend accessible on:  http://%COMPUTERNAME%:5000
pause
goto start

:exit
exit /b 0

:start
cls
goto :eof
