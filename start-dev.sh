#!/bin/bash

# Display the header
echo "===================================="
echo "E-Gov Platform - Development Startup"
echo "===================================="
echo ""
echo "This will start all services with hot reload enabled"
echo ""

# Check if user wants development mode
read -p "Use development mode with hot reload? (y/N): " use_dev_mode

if [[ $use_dev_mode =~ ^[Yy]$ ]]; then
    echo "🚀 Starting development mode with hot reload..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    echo ""
    echo "✅ Development services started with volume mounts!"
    echo "📝 Your code changes will be reflected instantly!"
else
    echo "Starting all services..."
    docker-compose -f docker-compose.yml up -d
fi

echo ""
echo "Services are available at:"
echo "- 🔧 Backend API: http://localhost:3000"
echo "- 👤 Citizen Portal: http://localhost:3001"
echo "- 🏛️ Department Portal: http://localhost:3002"
echo "- 📱 Admin Portal: http://localhost:3003"
echo "- 📚 API Docs: http://localhost:3000/debugger"
echo ""
echo "MongoDB is available at mongodb://localhost:27017"
echo ""
echo "Commands:"
echo "- View logs: docker-compose logs -f [service_name]"
echo "- Stop services: docker-compose down"
echo "- Restart service: docker-compose restart [service_name]"
echo ""
echo "Happy coding!"
