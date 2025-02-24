# To-Do App

## Project Overview
This is a simple To-Do application built using **Node.js, Express.js, and MongoDB** for the backend, and **plain JavaScript, HTML, and CSS** for the frontend. The application allows users to:

- Register and log in.
- Create, update, and delete tasks.
- View their task list with task details.
- Search for tasks by ID.

## Setup Instructions
### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **MongoDB** (local or cloud instance)

### Installation
1. **Clone the repository:**
   
   git clone https://github.com/your-repo/todo-app.git
   cd todo-app
   
2. **Install dependencies:**
   
   npm install
   
3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
4. **Start the server:**
   
   node server.js
   
   The server will start at `http://localhost:5000`.

5. **Run the frontend:**
   Simply open `index.html` in your browser.

## API Documentation

### Authentication
#### Register User
**Endpoint:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

#### Login User
**Endpoint:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### Tasks
#### Get All Tasks
**Endpoint:** `GET /api/tasks`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  ```json
  [
    {
      "_id": "taskId",
      "title": "Task 1",
      "description": "Description here",
      "dueDate": "2025-02-25"
    }
  ]
  ```

#### Get Task by ID
**Endpoint:** `GET /api/tasks/:id`
- **Response:**
  ```json
  {
    "_id": "taskId",
    "title": "Task 1",
    "description": "Description here",
    "dueDate": "2025-02-25"
  }
  ```

#### Create a Task
**Endpoint:** `POST /api/tasks`
- **Body:**
  ```json
  {
    "title": "New Task",
    "description": "Task details",
    "dueDate": "2025-02-28"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "newTaskId",
    "title": "New Task",
    "description": "Task details",
    "dueDate": "2025-02-28"
  }
  ```

#### Update Task
**Endpoint:** `PUT /api/tasks/:id`
- **Body:**
  ```json
  {
    "title": "Updated Task",
    "description": "Updated details",
    "dueDate": "2025-03-01"
  }
  ```

#### Delete Task
**Endpoint:** `DELETE /api/tasks/:id`
- **Response:**
  ```json
  {
    "message": "Task deleted"
  }
  ```

## License
This project is open-source and available under the [MIT License](LICENSE).

