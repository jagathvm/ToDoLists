# To-Do Application API

This project is a simple To-Do application API built using **Node.js**, **Express**, and **MongoDB**. It allows users to perform CRUD operations (Create, Read, Update, Delete) on a list of tasks. The API is structured using the MVC (Model-View-Controller) pattern for clean and maintainable code.

---

## Features

- **Create a Task**: Add a new to-do item.
- **Read Tasks**: Fetch all tasks or a specific task by ID.
- **Update a Task**: Modify task details, such as `task`, `description`, or `completed` status.
- **Delete a Task**: Remove a task by ID.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:

   ```env
   PORT=<your_port>
   MONGO_URI=<your_mongo_connection_string>
   MONGO_DBNAME=<your_database_name>
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Base URL

```
http://localhost:<PORT>
```

### Endpoints

#### 1. Fetch All Tasks

**GET** `/todos`

- Response:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "<task_id>",
        "task": "<task_name>",
        "description": "<task_description>",
        "completed": false
      }
    ]
  }
  ```

#### 2. Fetch a Task by ID

**GET** `/todos/:id`

- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "<task_id>",
      "task": "<task_name>",
      "description": "<task_description>",
      "completed": false
    }
  }
  ```

#### 3. Create a Task

**POST** `/todo`

- Request Body:
  ```json
  {
    "task": "<task_name>",
    "description": "<task_description>"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Task added.",
    "insertedId": "<task_id>"
  }
  ```

#### 4. Update a Task

**PATCH** `/todos/:id`

- Request Body:
  ```json
  {
    "task": "<updated_task_name>",
    "description": "<updated_task_description>"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Task updated."
  }
  ```

#### 5. Delete a Task

**DELETE** `/todos/:id`

- Response:
  ```json
  {
    "success": true,
    "message": "To-Do deleted."
  }
  ```

---

## Folder Structure

```
├── server
│   ├── config
│   │   └── db.js          # MongoDB connection setup
│   ├── controllers
│   │   └── todo-controller.js # Handles API logic
│   └── routes
│       └── todo-route.js  # Defines API routes
├── app.js                 # Entry point of the application
├── package-lock.json      # Locks the dependency tree for consistent installs
├── package.json           # Project metadata and dependencies
└── .env                   # Environment variables
```

---

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework.
- **MongoDB**: NoSQL database.
- **dotenv**: For environment variable management.

---

## Future Improvements

- Add pagination for fetching tasks.
- Add authentication and authorization.
- Enhance error handling and validation.
- Implement testing with Jest or Mocha.

---

## License

This project is licensed under the MIT License.
