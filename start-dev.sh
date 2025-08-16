#!/bin/bash

# Display the header
echo "===================================="
echo "E-Gov Platform - Development Startup"
echo "===================================="
echo ""
echo "This will start all services in Docker containers"
echo ""

# Start all services
echo "Starting all services..."
docker-compose -f docker-compose.yml up -d

echo ""
echo "Services are starting. You can access them at:"
echo "- Backend API: http://localhost:3000"
echo "- Citizen Portal: http://localhost:3001"
echo "- Department Portal: http://localhost:3002"
echo "- Admin Portal: http://localhost:3003"
echo ""
echo "MongoDB is available at mongodb://localhost:27017"
echo ""
echo "To view logs, run: docker-compose logs -f"
echo "To stop all services, run: docker-compose down"
echo ""
echo "Happy coding!"
