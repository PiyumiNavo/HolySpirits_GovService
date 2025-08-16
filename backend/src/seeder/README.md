# Database Seeder

This module handles seeding initial data into the database when the application starts. It's designed to run automatically when the application is deployed, ensuring that essential users and data are available in the system.

## Features

- Creates a system admin user if one doesn't exist
- Optionally creates test users for development environments
- Configurable through environment variables

## Environment Variables

The seeder can be configured using the following environment variables:

| Variable | Description | Default |
| --- | --- | --- |
| `ADMIN_EMAIL` | Email address for the system admin user | admin@egov.lk |
| `ADMIN_PASSWORD` | Password for the system admin user | Admin@123 |
| `CREATE_TEST_USERS` | Whether to create test users (true/false) | true |
| `TEST_USER_PASSWORD` | Password for test users | Citizen@123 |

## Implementation Details

The seeder module implements NestJS's `OnModuleInit` interface to run automatically when the application starts. It checks if the required users exist and only creates them if they don't already exist in the database.

## Security Notes

- The default passwords should be changed in production environments
- In production, set `CREATE_TEST_USERS=false` to prevent test accounts from being created

## Adding Additional Seeders

To add more data seeding (like departments, services, etc.), add new methods to the `SeederService` and call them from the `onModuleInit` method.
