 # Muyu Tea - Online Tea Course Platform

  A full-stack web application for browsing and enrolling in tea courses, built with the PERN stack (PostgreSQL, Express, React, Node.js). This project demonstrates modern web development practices including user authentication, RESTful API design, and cloud deployment on AWS.

  **Live Demo:** http://54.205.53.207

  ## Key Features

  - **User Authentication**: Secure registration and login system with JWT tokens and bcrypt password hashing
  - **Course Management**: Browse tea courses with detailed information, pricing, and images
  - **Responsive Design**: Modern UI with smooth animations and mobile-friendly layout
  - **Carousel Display**: Interactive course preview with navigation controls
  - **User Profile**: Personalized welcome message and session management
  - **Cloud Deployment**: Production-ready deployment on AWS EC2 with Nginx reverse proxy

  ## Key Learnings

  - **Full-stack Development**: Built and connected frontend, backend, and database layers
  - **Database Design**: PostgreSQL schema design with relationships (users, courses, enrollments)
  - **REST API**: Implemented RESTful endpoints with proper error handling and validation
  - **Authentication & Security**: JWT-based authentication, password hashing, secure session management
  - **React Hooks**: useState, useEffect, useNavigate for state management and routing
  - **TypeScript**: Type-safe development across frontend and backend
  - **Cloud Deployment**: AWS EC2 setup, Nginx configuration, PM2 process management
  - **DevOps**: Environment variables, production builds, debugging deployment issues

  ## Technologies

  ### Frontend
  - **React** 18.3.1
  - **TypeScript** 5.6.2
  - **Vite** 6.0.11
  - **React Router** 7.1.3
  - **Tailwind CSS** 3.4.17

  ### Backend
  - **Node.js** 20.x
  - **Express** 4.21.2
  - **TypeScript** 5.7.3
  - **PostgreSQL** (pg 8.13.1)
  - **JWT** (jsonwebtoken 9.0.2)
  - **bcrypt** 5.1.1

  ### Deployment
  - **AWS EC2** (Ubuntu 22.04)
  - **Nginx** (reverse proxy & static file serving)
  - **PM2** (process manager)

  ## Project Structure

  muyu_tea_website/
  ├── frontend/
  │   ├── src/
  │   │   ├── components/     # Reusable UI components
  │   │   ├── pages/          # Page components (Home, Login, CourseContent, etc.)
  │   │   ├── services/       # API service layer
  │   │   ├── layouts/        # Layout components
  │   │   └── assets/         # Images and static files
  │   ├── package.json
  │   └── vite.config.ts
  │
  ├── backend/
  │   ├── src/
  │   │   ├── controllers/    # Request handlers
  │   │   ├── services/       # Business logic
  │   │   ├── middlewares/    # Error handling, authentication
  │   │   ├── routes/         # API routes
  │   │   ├── types/          # TypeScript type definitions
  │   │   └── db.ts           # Database connection
  │   ├── package.json
  │   └── tsconfig.json
  │
  └── README.md

  ## Database Schema

  ```sql
  -- Users table
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Courses table
  CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Enrollments table
  CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
  );