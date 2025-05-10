# PhotoSharing

PhotoSharing is a simple social network web application that allows users to register, log in, share photos, follow other users, like and comment on posts, and manage their personal profiles. The project is built with a modern technology stack for both frontend and backend.

## Features

- User registration and authentication (JWT)
- Create, view, and delete photo posts
- Like and comment on posts
- Follow and unfollow other users
- View suggested users to follow
- Edit personal profile information
- Responsive and modern UI

## Technology Stack

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4.4-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-5.13-880000?logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Multer-1.4-FF9800?logo=multer&logoColor=white" alt="Multer" />
</p>

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm
- MongoDB

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/photosharing.git
   cd photosharing
   ```

2. **Install server dependencies:**
   ```
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```
   cd ../client
   npm install
   ```

4. **Set up environment variables:**

   Create a `config.env` file in the root directory with the following content (update values as needed):

   ```
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/photosharing
   DATABASE_PASSWORD=your_mongodb_password
   SERVER_PORT=8080
   ACCESS_TOKEN_KEY=your_access_token_secret
   ACCESS_TOKEN_EXPIRES=1d
   REFRESH_TOKEN_KEY=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRES=7d
   REFRESH_TOKEN_COOKIE_EXPIRES=7
   ```

5. **Start the backend server:**
   ```
   cd ../server
   npm run dev
   ```

6. **Start the frontend development server:**
   ```
   cd ../client
   npm run dev
   ```

7. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## Folder Structure

```
photosharing/
  ├── client/      # Frontend React app
  │   ├── public/              # Static files (favicon, etc.)
  │   ├── src/
  │   │   ├── components/      # React components (UI, forms, etc.)
  │   │   ├── contexts/        # React context providers for state management
  │   │   ├── layouts/         # Layout components for pages
  │   │   ├── pages/           # Page-level React components
  │   │   ├── utils/           # Utility functions and API endpoints
  │   │   └── index.css        # Global styles (TailwindCSS)
  │   ├── index.html           # Main HTML file
  │   ├── package.json         # Client dependencies and scripts
  │   └── ...                  # Other config files (Vite, Tailwind, etc.)
  └── server/      # Backend Express API
      ├── public/              # Uploaded images and static files
      ├── src/
      │   ├── controllers/     # Route handler logic (user, post, comment, etc.)
      │   ├── middlewares/     # Express middlewares (auth, error handling, etc.)
      │   ├── models/          # Mongoose models (User, Post, Comment)
      │   ├── routes/          # Express route definitions
      │   └── utils/           # Utility functions (JWT, error, etc.)
      ├── config.env           # Environment variables
      ├── server.js            # Entry point for the backend server
      ├── package.json         # Server dependencies and scripts
      └── ...                  # Other config files
```

- The **client** folder contains the React frontend application, organized by components, contexts, layouts, pages, and utilities. It uses Vite for development and TailwindCSS for styling.
- The **server** folder contains the Express backend API, structured by MVC pattern with controllers, models, routes, and middlewares. It handles authentication, file uploads, and serves static files (such as uploaded images) from the `public` directory.
