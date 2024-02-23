Foody Backend
Url:https://foody-be.onrender.com
Api documentation:https://documenter.getpostman.com/view/29415423/2sA2rCT1PT

# Express.js Backend for User Authorization

This Express.js backend provides user authentication functionalities including signup and login. Below is a brief overview of the project structure and how to get started with running the backend server.

## Project Structure

- **`index.js`**: Entry point of the application where the Express server is configured and started.
- **`routes`**: Contains route handlers for different endpoints.
  - **`userRoutes.js`**: Handles routes related to user authentication such as signup and login.
- **`middleware`**: Contains custom middleware functions.
  - **`errorMiddleware.js`**: Middleware functions for handling errors and not found routes.
- **`config`**: Configuration files.
  - **`db.js`**: Connects to the database.
- **`.env`**: Environment variables configuration file.
- **`package.json`**: File containing project metadata and dependencies.
