# E-Gov Platform Development Guide

This document provides guidance for running the E-Gov platform locally with Docker.

## Architecture

The platform consists of the following components:

1. **MongoDB** - Database (port 27017)
2. **Backend API** - NestJS application (port 3000)
3. **Citizen Portal** - Next.js frontend for citizens (port 3001)
4. **Department Portal** - Next.js frontend for government departments (port 3002)
5. **Admin Portal** - Next.js frontend for platform administrators (port 3003)

## Running with Docker Compose

To start all services at once:

```bash
# On Linux/Mac
./start-dev.sh

# On Windows PowerShell
.\start-dev.ps1

# Alternatively, use Docker Compose directly
docker-compose up
```

This will start all services in Docker containers, and they will be accessible at:

- Backend API: http://localhost:3000
- Citizen Portal: http://localhost:3001
- Department Portal: http://localhost:3002
- Admin Portal: http://localhost:3003
- MongoDB: mongodb://localhost:27017

## Default Users

After starting the services, the following default users are created:

1. **System Administrator**
   - Email: admin@egov.lk (or as configured)
   - Password: Admin@123 (or as configured)

2. **Test Citizen** (if enabled)
   - Email: citizen@example.com
   - Password: Citizen@123 (or as configured)

## Developing in Docker

When working with Docker, any changes to the code require rebuilding the containers:

```bash
# Rebuild a specific service
docker-compose build backend
docker-compose build citizen_frontend
docker-compose build department_frontend
docker-compose build admin_frontend

# Restart a specific service
docker-compose up -d --no-deps backend
```

## Accessing Logs

To view the logs of a specific service:

```bash
docker-compose logs -f backend
docker-compose logs -f citizen_frontend
docker-compose logs -f department_frontend
docker-compose logs -f admin_frontend
docker-compose logs -f mongodb
```

## Stopping All Services

To stop all services:

```bash
docker-compose down
```

To stop all services and remove volumes (this will delete database data):

```bash
docker-compose down -v
```
