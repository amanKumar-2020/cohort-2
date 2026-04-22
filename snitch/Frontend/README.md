# Snitch - Online Clothing Shop

Snitch is a full-stack online clothing shop web application with authentication for buyers and sellers.

The project includes:

- Frontend: React + Vite + Redux Toolkit + Tailwind CSS
- Backend: Node.js + Express + MongoDB + JWT

## Current Features

- User registration with role selection (buyer or seller)
- User login with JWT-based authentication
- Protected auth flow using cookie-based token storage
- Clean, responsive auth UI (Register and Login pages)
- Home route scaffold for product listing expansion

## Project Structure

```text
snitch/
	Backend/
		server.js
		src/
			app.js
			config/
			controllers/
			models/
			routes/
			validator/

	Frontend/
		src/
			App/
			features/
				auth/
				products/
```

## Tech Stack

Frontend:

- React 19
- React Router
- Redux Toolkit + React Redux
- Axios
- Tailwind CSS
- Vite

Backend:

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- express-validator

## Prerequisites

Make sure these are installed:

- Node.js (v18 or later recommended)
- npm
- MongoDB instance (local or cloud)

## Environment Variables (Backend)

Create a .env file inside Backend/ with:

```env
PORT=3000
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

## Installation and Run

### 1) Install Backend Dependencies

```bash
cd Backend
npm install
```

### 2) Start Backend Server

```bash
npm run dev
```

Backend will run on:

- http://localhost:3000

### 3) Install Frontend Dependencies

Open a new terminal:

```bash
cd Frontend
npm install
```

### 4) Start Frontend

```bash
npm run dev
```

Frontend will run on:

- http://localhost:5173 (or the port Vite shows in terminal)

The frontend is configured to proxy requests from /api to:

- http://localhost:3000

## Available Scripts

Frontend (inside Frontend/):

- npm run dev - Start development server
- npm run build - Build for production
- npm run preview - Preview production build
- npm run lint - Run ESLint

Backend (inside Backend/):

- npm run dev - Start backend with nodemon

## API Endpoints (Auth)

Base route:

- /api/auth

Endpoints:

- POST /api/auth/register
- POST /api/auth/login

### Register Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "contact": "9999999999",
  "password": "Password123",
  "isSeller": false
}
```

### Login Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Note: Login validation supports either email or contact, but current frontend login form uses email + password.

## Validation Rules

- fullName is required
- email must be valid
- contact is required
- password must be at least 6 characters
- password must include uppercase, lowercase, and number
- isSeller must be boolean

## Roadmap Ideas

- Add product catalog and categories
- Add product details page
- Add cart and checkout flow
- Add seller product management dashboard
- Add order history and profile pages
- Add route protection and role-based authorization

## Author

Built by Aman.
