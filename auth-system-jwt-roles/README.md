# Auth System (JWT + Roles)

A minimal Node.js + Express API that demonstrates:
- User registration with **bcrypt** password hashing
- Login with **JWT**
- **Role-based access** control (user/admin)
- **Protect routes** middleware

## Quick start

```bash
# 1) Extract and open the folder
npm install

# 2) Copy env
cp .env.example .env   # (Windows: copy .env.example .env) and set JWT_SECRET

# 3) Reset (create) the SQLite DB with a default admin
npm run reset:db

# 4) Start the API
npm run dev
```

### Default Admin
After `npm run reset:db`, a default admin user is created:
- email: admin@example.com
- password: admin123
(Please change/remove in production.)

## Endpoints

- `POST /api/auth/register` – Register new user (default role: `user`)
- `POST /api/auth/login` – Login and get JWT
- `GET /api/user/profile` – Protected route for any authenticated user
- `GET /api/admin/users` – Admin-only route that lists all users

## Environment

```
PORT=4000
JWT_SECRET=replace-with-a-long-random-string
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

The database file is `data.sqlite` in the project root.
