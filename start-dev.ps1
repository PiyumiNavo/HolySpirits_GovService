# E-Gov Platform - Development Startup Script
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "E-Gov Platform - Development Startup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will start all services with optional hot reload" -ForegroundColor Yellow
Write-Host ""

# Check if user wants development mode
$use_dev_mode = Read-Host "Use development mode with hot reload? (y/N)"

if ($use_dev_mode -match "^[Yy]$") {
    Write-Host "🚀 Starting development mode with hot reload..." -ForegroundColor Green
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    Write-Host ""
    Write-Host "✅ Development services started with volume mounts!" -ForegroundColor Green
    Write-Host "📝 Your code changes will be reflected instantly!" -ForegroundColor Yellow
} else {
    Write-Host "Starting all services..." -ForegroundColor Green
    docker-compose -f docker-compose.yml up -d
}

Write-Host ""
Write-Host "Services are available at:" -ForegroundColor Cyan
Write-Host "- 🔧 Backend API: http://localhost:3000" -ForegroundColor White
Write-Host "- 👤 Citizen Portal: http://localhost:3001" -ForegroundColor White
Write-Host "- 🏛️ Department Portal: http://localhost:3002" -ForegroundColor White
Write-Host "- 📱 Admin Portal: http://localhost:3003" -ForegroundColor White
Write-Host "- 📚 API Docs: http://localhost:3000/debugger" -ForegroundColor White
Write-Host ""
Write-Host "MongoDB is available at mongodb://localhost:27017" -ForegroundColor Gray
Write-Host ""
Write-Host "Commands:" -ForegroundColor Yellow
Write-Host "- View logs: docker-compose logs -f [service_name]" -ForegroundColor Gray
Write-Host "- Stop services: docker-compose down" -ForegroundColor Gray
Write-Host "- Restart service: docker-compose restart [service_name]" -ForegroundColor Gray
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green
