# 🍳 Recipe Finder

A modern full-stack **Recipe Finder web application** that allows users to discover meals, search for recipes, browse categories, and view detailed ingredients and recipe information.

The application has a React frontend connected to a Node.js/Express backend API and uses **TheMealDB** as the external recipe data source.

## 🌐 Live Demo

**Frontend:**
https://recipe-finder-frontend-livid.vercel.app/

---

## 📌 Project Overview

Recipe Finder is designed to make discovering meals simple and convenient.

Users can:

* 🔍 Search for recipes
* 🍽️ Browse available meals
* 📂 Explore recipes by category
* 📖 View complete recipe details
* 🥕 View ingredients and measurements
* 👤 Create an account
* 🔐 Login and logout securely
* 🔑 Reset their password
* 🔄 Refresh authentication tokens
* 📱 Use the application on desktop and mobile devices

---

## ✨ Features

### 👤 Authentication

* User registration
* User login
* User logout
* Get current authenticated user
* Password reset
* JWT-based authentication
* Access and refresh tokens
* Password hashing with bcrypt

### 🍴 Recipe Features

* Browse meals
* Search meals by name
* Pagination
* View meal details
* View ingredients and measurements
* Browse meal categories
* View meals by category
* Recipe images and information
* Responsive recipe cards

### 🎨 Frontend

* Responsive design
* React components
* React Router navigation
* Tailwind CSS styling
* Loading states
* Error handling
* Protected authentication flow
* Dark/light theme support
* Lazy-loaded pages for better performance

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* Framer Motion

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt
* Express Async Handler

### External API

* TheMealDB API

### Deployment

* Vercel — Frontend
* Railway — Backend
* PostgreSQL / Neon — Database

---

## 🏗️ Project Architecture

```text
Recipe Finder
│
├── Frontend
│   ├── React
│   ├── TypeScript
│   ├── Tailwind CSS
│   ├── React Router
│   └── Axios
│
├── Backend
│   ├── Node.js
│   ├── Express
│   ├── TypeScript
│   ├── Prisma
│   ├── PostgreSQL
│   ├── JWT Authentication
│   └── bcrypt
│
└── External API
    └── TheMealDB
```

---

## 📂 Frontend Structure

```text
src/
│
├── components/
│   ├── Header
│   ├── Footer
│   ├── MealCard
│   └── ...
│
├── context/
│   └── AuthContext
│
├── pages/
│   ├── LoginPage
│   ├── RegisterPage
│   ├── HomePage
│   ├── MainPage
│   ├── CategoryPage
│   ├── CategoryMealsPage
│   ├── IngredientsPage
│   └── ForgotPasswordPage
│
├── services/
│   ├── authService
│   └── mealsService
│
├── types/
│   ├── auth
│   └── meal
│
├── App.tsx
└── main.tsx
```

---

## 🔌 API

The application uses a custom backend API for authentication and meal-related requests.

### Base URL

```text
/api/v1
```

### Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
```

### Meals

```http
GET /api/meals
GET /api/meals/search?q=chicken&page=1&limit=10
GET /api/meals/:id
GET /api/meals/categories
GET /api/meals/category/:category
```

### Example Search Request

```http
GET /api/meals/search?q=chicken&page=1&limit=10
```

Example response structure:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

## 🍲 TheMealDB

Recipe information is powered by **TheMealDB**, a public meal and recipe API.

TheMealDB provides information such as:

* Meal names
* Meal images
* Categories
* Ingredients
* Measurements
* Instructions
* Cuisine/area information

API Documentation:

https://www.themealdb.com/api.php

---

## ⚙️ Environment Variables

Create a `.env` file for local development.

### Frontend

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

For production, configure the Vercel environment variable:

```env
VITE_API_BASE_URL=YOUR_BACKEND_URL
```

### Backend

Example backend environment variables:

```env
PORT=8080

DATABASE_URL=your_database_url

JWT_SECRET=your_access_token_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

NODE_ENV=development
```

> ⚠️ Never commit your `.env` file to GitHub. Add `.env` to `.gitignore`.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

Move into the project:

```bash
cd recipe-finder-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create:

```text
.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## ☁️ Deployment

The frontend is deployed using **Vercel**.

Live application:

https://recipe-finder-frontend-livid.vercel.app/

For deployment:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.
5. Make sure the frontend API URL points to the deployed backend.

---

## 🔐 Security

The application includes several security practices:

* Password hashing using bcrypt
* JWT authentication
* Access and refresh tokens
* Environment variables for secrets
* `.env` excluded from Git
* Backend authentication middleware
* CORS configuration
* Protected authentication routes

---

## 📱 Responsive Design

Recipe Finder is designed to work across different screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

---

## 🎯 Future Improvements

Possible future improvements include:

* ⭐ Favorite recipes
* 🔎 Advanced recipe filtering
* 🥗 Dietary filters
* ❤️ User recipe collections
* 👤 User profile page
* 🌙 Improved theme customization
* 🖼️ Recipe image upload
* 🔔 Notifications
* 📊 User dashboard
* 🔐 Google authentication
* ⭐ Recipe ratings and reviews

---

## 👨‍💻 Developer

**Shahzaib Shahid**

Full Stack Web Developer

### Skills Used in This Project

* React
* TypeScript
* Node.js
* Express.js
* PostgreSQL
* Prisma
* JWT
* bcrypt
* REST APIs
* Tailwind CSS
* Git & GitHub
* Vercel
* Railway

---

## 📄 License

This project is created for learning and portfolio purposes.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
