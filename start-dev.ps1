# E-Gov Platform - Development Startup Script
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "E-Gov Platform - Development Startup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will start all services in Docker containers" -ForegroundColor Yellow
Write-Host ""

# Start all services
Write-Host "Starting all services..." -ForegroundColor Green
docker-compose up -d

Write-Host ""
Write-Host "Services are starting. You can access them at:" -ForegroundColor Green
Write-Host "- Backend API: http://localhost:3000" -ForegroundColor Cyan
Write-Host "- Citizen Portal: http://localhost:3001" -ForegroundColor Cyan
Write-Host "- Department Portal: http://localhost:3002" -ForegroundColor Cyan
Write-Host "- Admin Portal: http://localhost:3003" -ForegroundColor Cyan
Write-Host ""
Write-Host "MongoDB is available at mongodb://localhost:27017" -ForegroundColor Cyan
Write-Host ""
Write-Host "To view logs, run: docker-compose logs -f" -ForegroundColor Yellow
Write-Host "To stop all services, run: docker-compose down" -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy coding!" -ForegroundColor Green
