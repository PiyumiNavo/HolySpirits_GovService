# Docker Development Setup

This document provides information about the Docker setup for development.

## Services

Our Docker Compose setup includes the following services:

1. **MongoDB** - Database service
2. **Backend** - NestJS API
3. **Frontend** - Web client application

## MongoDB Configuration

The MongoDB service is configured to:

- Run version 6 of MongoDB
- Expose port 27017 to the host machine
- Store data in a persistent volume (`mongodb_data`)
- Include a health check to ensure the database is ready before starting dependent services

## Connection Strings

When running the application with Docker Compose:

- The backend connects to MongoDB using: `mongodb://mongodb:27017/e-gov`
- This connection string uses the service name (`mongodb`) as the hostname, which resolves within the Docker network

## Running the Application

To run the entire application stack:

```bash
docker-compose up
```

## Data Persistence

MongoDB data is stored in a Docker volume named `mongodb_data`. This ensures your data persists across container restarts.

## Local Development vs. Docker

When developing:

1. **With Docker**: The environment is self-contained and doesn't require any local installations
2. **Without Docker**: You'll need to have MongoDB installed locally

## Environment Variables

The `.env` file can be used to override default settings:

- `MONGO_URI` - Connection string for MongoDB
- `ADMIN_EMAIL` - Email for the system admin user
- `ADMIN_PASSWORD` - Password for the system admin user
- `CREATE_TEST_USERS` - Whether to create test users (true/false)
- `TEST_USER_PASSWORD` - Password for test users

## Troubleshooting

If you encounter connection issues:

1. Ensure the MongoDB container is running: `docker-compose ps`
2. Check MongoDB logs: `docker-compose logs mongodb`
3. Verify the connection string in the backend service
