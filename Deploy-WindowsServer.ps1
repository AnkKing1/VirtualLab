Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   VirtualLab Windows Server Deployment" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires Administrator privileges" -ForegroundColor Red
    Write-Host "   Right-click PowerShell and 'Run as Administrator'" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Running with Administrator privileges" -ForegroundColor Green
Write-Host ""

try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker is available: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed or not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "For Windows Server, install Docker using:" -ForegroundColor Yellow
    Write-Host "  1. Enable Windows Container feature" -ForegroundColor Yellow
    Write-Host "  2. Install Docker Desktop or Docker Engine" -ForegroundColor Yellow
    Write-Host "  3. Switch to Linux containers mode" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Stop existing containers
Write-Host "Stopping any existing Docker containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.windows.yml down 2>$null

$processes5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($processes5000) {
    Write-Host "Killing processes on port 5000..." -ForegroundColor Yellow
    $processes5000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
}

$processes3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($processes3000) {
    Write-Host "Killing processes on port 3000..." -ForegroundColor Yellow
    $processes3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
}

# Configure Windows Firewall
Write-Host "Configuring Windows Firewall..." -ForegroundColor Yellow
try {
    Remove-NetFirewallRule -DisplayName "VirtualLab-3000" -ErrorAction SilentlyContinue
    Remove-NetFirewallRule -DisplayName "VirtualLab-5000" -ErrorAction SilentlyContinue
    New-NetFirewallRule -DisplayName "VirtualLab-3000" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow | Out-Null
    New-NetFirewallRule -DisplayName "VirtualLab-5000" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow | Out-Null
    Write-Host "✅ Firewall rules configured" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not configure firewall automatically" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting VirtualLab containers for Windows Server..." -ForegroundColor Yellow

# Start containers
$result = docker-compose -f docker-compose.windows.yml up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ VirtualLab deployed successfully on Windows Server!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Frontend (local):    http://localhost:3000" -ForegroundColor Cyan
    Write-Host "🌐 Frontend (external): http://$env:COMPUTERNAME:3000" -ForegroundColor Cyan
    Write-Host "🔧 Backend (local):     http://localhost:5000" -ForegroundColor Cyan
    Write-Host "🔧 Backend (external):  http://$env:COMPUTERNAME:5000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Management commands:" -ForegroundColor Yellow
    Write-Host "  View logs: docker-compose -f docker-compose.windows.yml logs -f" -ForegroundColor Gray
    Write-Host "  Stop:      docker-compose -f docker-compose.windows.yml down" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Windows Server troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Ensure Docker Desktop is in Linux containers mode" -ForegroundColor Gray
    Write-Host "2. Check Windows Defender/Antivirus exclusions" -ForegroundColor Gray
    Write-Host "3. Verify internet connectivity for image downloads" -ForegroundColor Gray
    Write-Host "4. Check available disk space" -ForegroundColor Gray
    Write-Host "5. Run: docker system prune -f" -ForegroundColor Gray
}

Read-Host "Press Enter to exit"
