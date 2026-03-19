# Auth API - User Authentication with Bearer Token

A simple REST API built with Node.js and Express.js that handles user registration, login, and profile access using JWT Bearer Token authentication.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs

## Project Structure (MVC Pattern)
```
auth-api/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   └── authController.js   # Register, Login, Get User logic
├── middleware/
│   └── authMiddleware.js   # JWT token verification
├── models/
│   └── User.js             # User schema
├── routes/
│   └── authRoutes.js       # API routes
├── .env.example            # Environment variable template
├── package.json
└── server.js               # App entry point
```

## How It Works
1. User registers with username, email and password
2. Password is hashed using bcryptjs before saving to database
3. User logs in and receives a JWT token
4. Token is used to access protected routes

## Setup Instructions
1. Clone the repo and run `npm install`
2. Create a `.env` file and add your values:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
3. Run `npm run dev`

## API Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login and get token | No |
| GET | /api/auth/user | Get logged-in user profile | Yes ✅ |

## Deployment
Deployed on Render: ## Deployment
Deployed on Render: https://bearer-token-1-v72y.onrender.com