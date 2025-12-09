# Authentication Guide

## Overview
The admin panel is now protected with JWT-based authentication. Only authenticated users can access admin routes and perform CRUD operations.

## Features
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes (frontend & backend)
- ✅ Auto token verification
- ✅ Logout functionality
- ✅ Token stored in localStorage

## Setup

### 1. Configure Environment Variables

Add to `server/.env`:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** Use a strong, random secret key in production!

### 2. Create Admin User

**Option A: Using the Script (Recommended)**

```bash
cd server
node scripts/createAdmin.js
```

This creates an admin with default credentials:
- Username: `admin`
- Email: `admin@subline.com`
- Password: `admin123`

**Option B: Using API (Postman/Thunder Client)**

```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "your-secure-password"
}
```

Response:
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "admin": {
      "_id": "...",
      "username": "admin",
      "email": "admin@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Login to Admin Panel

1. Navigate to: `http://localhost:5173/admin/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123` (or your custom password)
3. Click "Login"
4. You'll be redirected to the admin dashboard

## API Endpoints

### Authentication Routes

#### Register Admin
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "securepassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "_id": "...",
      "username": "admin",
      "email": "admin@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer YOUR_JWT_TOKEN
```

### Protected Routes

All these routes now require authentication:

**Categories:**
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

**Gallery:**
- `POST /api/gallery` - Create gallery item
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item

**Upload:**
- `POST /api/upload/single` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images
- `DELETE /api/upload` - Delete image

### Public Routes (No Auth Required)

**Categories:**
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category

**Gallery:**
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single gallery item

## Frontend Usage

### Login Flow

```typescript
import { useAuth } from "@/contexts/AuthContext"

function LoginComponent() {
  const { login } = useAuth()
  
  const handleLogin = async () => {
    try {
      await login(username, password)
      // Redirect to admin panel
    } catch (error) {
      // Handle error
    }
  }
}
```

### Protected Routes

```typescript
import ProtectedRoute from "@/components/ProtectedRoute"

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

### Logout

```typescript
import { useAuth } from "@/contexts/AuthContext"

function LogoutButton() {
  const { logout } = useAuth()
  
  return (
    <button onClick={logout}>
      Logout
    </button>
  )
}
```

### Check Authentication Status

```typescript
import { useAuth } from "@/contexts/AuthContext"

function Component() {
  const { isAuthenticated, admin, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {admin.username}!</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  )
}
```

## Security Features

### Backend
1. **Password Hashing:** Passwords hashed with bcrypt (10 salt rounds)
2. **JWT Tokens:** Signed with secret key, expires in 7 days
3. **Protected Routes:** Middleware verifies token on protected endpoints
4. **Password Excluded:** Password field removed from JSON responses

### Frontend
1. **Token Storage:** JWT stored in localStorage
2. **Auto Verification:** Token verified on app load
3. **Protected Routes:** Unauthenticated users redirected to login
4. **Auto Headers:** Token automatically included in API requests

## Token Lifecycle

1. **Login:** User logs in, receives JWT token
2. **Storage:** Token stored in localStorage
3. **Requests:** Token included in Authorization header for protected routes
4. **Verification:** Backend verifies token on each request
5. **Expiration:** Token expires after 7 days
6. **Logout:** Token removed from localStorage

## Troubleshooting

### Cannot Login
- Verify MongoDB is running
- Check admin user exists (run createAdmin.js)
- Verify credentials are correct
- Check browser console for errors

### Token Expired
- Login again to get new token
- Token expires after 7 days

### 401 Unauthorized Errors
- Token may be invalid or expired
- Try logging out and back in
- Clear localStorage and login again

### Cannot Access Admin Panel
- Ensure you're logged in
- Check token in localStorage: `localStorage.getItem('admin_token')`
- Verify backend is running

## Production Recommendations

### Security Best Practices

1. **Strong JWT Secret**
   ```env
   # Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   JWT_SECRET=a1b2c3d4e5f6...very-long-random-string
   ```

2. **Environment Variables**
   - Never commit `.env` files
   - Use different secrets for dev/prod
   - Store secrets securely (AWS Secrets Manager, etc.)

3. **HTTPS Only**
   - Use HTTPS in production
   - Secure cookie flags if using cookies

4. **Rate Limiting**
   - Add rate limiting to login endpoint
   - Prevent brute force attacks

5. **Password Policy**
   - Enforce strong passwords
   - Minimum 8 characters
   - Require special characters

6. **Additional Features to Consider**
   - Password reset functionality
   - Email verification
   - Two-factor authentication (2FA)
   - Session management
   - Admin roles and permissions
   - Activity logging

## Testing Authentication

### Using curl

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Access Protected Route:**
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"Test Category"}'
```

### Using Postman/Thunder Client

1. Login and copy the token from response
2. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE`

## Default Credentials

⚠️ **IMPORTANT:** Change default credentials immediately!

```
Username: admin
Password: admin123
```

After first login, create a new admin with a strong password and delete the default admin.

