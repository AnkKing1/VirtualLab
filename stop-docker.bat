@echo off
echo Stopping VirtualLab containers...
docker-compose down

echo.
echo Removing old images...
docker image prune -f

echo.
echo ✅ VirtualLab stopped and cleaned up.
pause
