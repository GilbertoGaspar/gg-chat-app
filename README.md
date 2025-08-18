# GG Chat App

> A modern, full-stack chat application built with Next.js and Node.js, enabling real-time messaging, authentication, and seamless user experience.

## Features

- **Real-Time Messaging**

  - Instant chat between users
  - Room conversations

- **Chat Experience**

  - Responsive design for mobile and desktop
  - Ability to create and join rooms easily

## Tech Stack

- **Frontend**

  - Next.js with App Router
  - React 19
  - TailwindCSS for styling
  - React Query for data fetching
  - React Hook Form for forms
  - Zod for validation

- **Backend**
  - Node.js with Express
  - Socket.IO for real-time communication
  - Mongoose with MongoDB Database
  - JWT for authentication
  - bcrypt for password hashing
  - Redis for pub/sub scaling.

## Getting Started

1. Clone the repository

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up your environment variables:

   ```env
   # backend/.env
   MONGO_DB_URI=
   REDIS_URL=
   EXPRESS_PORT=
   JWT_SECRET=
   JWT_EXPIRES_IN=
   CORS_ORIGIN=


   # frontend/.env
   API_URL=
   NEXT_PUBLIC_SOCKET_URL=
   ```

4. Run redis with docker :

   ```bash
   docker run -d -p 6379:6379 redis
   ```

5. Start the development servers:

   ```bash
   # In two terminals
   cd backend
   npm run dev

   cd frontend
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses a MongoDB database with the following main entities:

- users
- chatmessages
