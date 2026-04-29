# Auth Module

This module handles JWT authentication and role-based access control.

## Features

- User login
- JWT token generation
- Role-based access control (Admin, Redactor, Lector)
- Token validation middleware

## Guards

- `JwtAuthGuard` - Protect authenticated routes
- `RolesGuard` - Enforce role-based permissions

## Decorators

- `@Roles(...)` - Mark endpoints with required roles
- `@CurrentUser()` - Inject current user into handlers
