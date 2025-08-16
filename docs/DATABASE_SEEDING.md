# Database Seeding Guide

The application includes an automatic database seeder that creates necessary users and data when the application starts. This document explains how to configure and use this feature.

## Default Users

By default, the seeder creates:

1. **System Administrator**
   - Email: `admin@egov.lk` (or as configured in environment variables)
   - Password: `Admin@123` (or as configured in environment variables)
   - Role: SYSTEM_ADMIN

2. **Test Citizen** (only created if `CREATE_TEST_USERS=true`)
   - Email: `citizen@example.com`
   - Password: `Citizen@123` (or as configured in environment variables)
   - Role: CITIZEN

## Configuration

You can configure the seeder through environment variables in your `.env` file or Docker environment:

```bash
# Admin User Configuration
ADMIN_EMAIL=admin@egov.lk
ADMIN_PASSWORD=Admin@123

# Test User Configuration
CREATE_TEST_USERS=true
TEST_USER_PASSWORD=Citizen@123
```

## Docker Setup

When running the application with Docker, these variables are already configured in the `docker-compose.yml` file. You can override them by creating a `.env` file in the project root or by providing them when starting Docker:

```bash
ADMIN_EMAIL=custom@example.com ADMIN_PASSWORD=SecurePass123 docker-compose up
```

## Production Considerations

For production deployments:

1. Always change the default passwords
2. Set `CREATE_TEST_USERS=false` to prevent test accounts from being created
3. Use secure, unique passwords for the admin account

## Adding More Seed Data

If you need to seed additional data (like departments, services, etc.), modify the `SeederService` in `backend/src/seeder/seeder.service.ts`.
