# Task Management Application (MERN + PostgreSQL)

## 📌 Overview

This is a **Task Management Application** developed using the **MERN stack** with **PostgreSQL** as the database. The application supports user authentication, task CRUD operations, and a dashboard with visual task statistics.

The project follows modern best practices including JWT-based authentication, RESTful APIs, proper error handling, and a clean React frontend with state management.

---

## 🚀 Live Demo

* **Frontend Live URL:** [https://tma-prod.netlify.app](https://tma-prod.netlify.app)
* **Backend API URL:** [https://task-management-app-x64n.onrender.com](https://task-management-app-x64n.onrender.com)

---

## 🧰 Tech Stack

### Frontend

* React.js
* Redux Toolkit / Context API
* Axios
* Chart.js
* HTML5, CSS3

### Backend

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT (JSON Web Token)

---

## ✨ Features

### 🔐 Authentication

* User Login using JWT
* Protected APIs (Authorization using Bearer Token)

### ✅ Task Management

* Create Task
* View All Tasks
* Update Task Status
* Delete Task

**Task Fields:**

* Title
* Status (Todo, In Progress, Completed)
* Description
* Priority
* Start Date
* End Date

### 📊 Dashboard

* Visual representation of task statistics
* Charts showing task status distribution
* Data fetched dynamically from backend APIs

### 🛡️ Other Features

* Form validation (Frontend)
* Loading indicators
* Proper error handling (Frontend & Backend)
* Clean and modular code structure

---

## 📂 Project Structure

### Backend

```
backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── utils/
│── server.js
│── package.json
```

### Frontend

```
frontend/
│── src/
│   ├── components/
│   ├── helpers/
│   ├── store/
│   └── App.js
│── package.json
```

---

## 🔗 API Endpoints (Sample)

### Auth

* `POST /api/auth/login`

### Tasks

* `GET /api/tasks` – Get all tasks
* `POST /api/tasks` – Create a task
* `PUT /api/tasks/:id` – Update a task
* `DELETE /api/tasks/:id` – Delete a task

> All task APIs are protected using JWT authentication.

---

## ⚙️ Installation & Setup

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🗄️ Database

* PostgreSQL
* Managed using Sequelize ORM
* Task status implemented using ENUM:

  * Todo
  * In Progress
  * Completed

---

## 📈 Dashboard Charts

* Built using Chart.js
* Displays:

  * Total tasks
  * Tasks by status

---

## 👨‍💻 Author

**Harini S**

---

## 📝 Notes

This project demonstrates full-stack development skills, REST API design, authentication, and data visualization using modern JavaScript technologies.
