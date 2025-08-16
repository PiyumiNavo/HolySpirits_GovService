# Admin App Authentication Setup

This document explains how the authentication system is configured in the admin app.

## Overview

The admin app uses a comprehensive authentication system with:
- Axios API client with automatic token injection
- React Context for auth state management
- Protected routes
- Automatic token refresh and error handling

## Key Files

### 1. API Client (`src/lib/api-client.ts`)
- Configured axios instance with base URL
- Request interceptor: Automatically adds Bearer token to all requests
- Response interceptor: Handles 401 errors and redirects to login
- Generic methods for GET, POST, PUT, PATCH, DELETE requests
- File upload support

### 2. Auth Service (`src/services/auth.service.ts`)
- Login/logout functionality
- Token management (localStorage)
- User profile management
- Token verification

### 3. Auth Hook (`src/hooks/useAuth.tsx`)
- React Context Provider for auth state
- `useAuth()` hook for components
- Manages authentication state across the app

### 4. Protected Routes (`src/components/ProtectedRoute.tsx`)
- Wrapper component for protected pages
- Automatic redirect to login if not authenticated
- Role-based access control support

## Usage Examples

### Login Page
```tsx
import { useAuth } from "../../hooks/useAuth";

const { login } = useAuth();

// In form submit handler:
await login(email, password);
```

### Protected Page
```tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";

export default function MyPage() {
  const { user, logout } = useAuth();
  
  return (
    <ProtectedRoute>
      <div>Welcome {user?.name}</div>
      <button onClick={logout}>Logout</button>
    </ProtectedRoute>
  );
}
```

### API Calls
```tsx
import apiClient from "../lib/api-client";

// All requests automatically include auth token
const departments = await apiClient.get('/departments');
const newDept = await apiClient.post('/departments', data);
```

## Configuration

### Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend Integration
The system expects:
- `POST /auth/login` endpoint
- JWT tokens in response
- Standard HTTP status codes (401 for unauthorized)

## Features

1. **Automatic Token Management**: Tokens are stored in localStorage and automatically added to requests
2. **Error Handling**: 401 responses trigger automatic logout and redirect
3. **Loading States**: Built-in loading management for auth operations
4. **Type Safety**: Full TypeScript support with proper types
5. **Route Protection**: Easy-to-use component for protecting pages
6. **Role-Based Access**: Support for role-based route protection

## Security Notes

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- All API calls go through the interceptor system
- Automatic cleanup on logout
- Token verification on app startup
