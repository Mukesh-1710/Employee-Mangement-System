# 👥 Employee Management System

A full-stack, pixel-perfect **Employee Management System** built with a modern web stack. This application allows HR admins to perform full CRUD operations on employee records, including multipart image file uploads, within a beautiful and fully responsive UI.

## 🚀 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (for pixel-perfect responsive styling)
- **Axios** (for API calls)
- **React Icons**

### Backend
- **Node.js** & **Express.js** (REST API)
- **MySQL** (Relational Database)
- **Sequelize** (ORM for SQL Queries)
- **Multer** (for handling image uploads)

---

## ✨ Features
1. **Full CRUD Operations:** Add, read, update, and delete employees.
2. **View Mode:** Dedicated read-only screens for inspecting employee records.
3. **Image Uploads:** Seamlessly attach profile pictures to employees (stored locally with Multer).
4. **Search Functionality:** Filter employees in real-time.
5. **Pixel-Perfect Styling:** 1:1 match with modern Figma UI designs, featuring custom alert modals and responsive data grids.

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js installed
- MySQL Server running

### 1. Database Setup
1. Create a MySQL database locally.
2. Ensure you have the credentials ready for the backend connection.

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your Database Configuration inside `backend/config/db.js` or via a `.env` file depending on setup.
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server typically runs on `http://localhost:8080`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The app usually runs on `http://localhost:5173`.*

---

## 📡 API Endpoints Overview

The backend exposes a standard RESTful API under `/api/employees`:
- `GET /api/employees` - Retrieve all employees.
- `GET /api/employees/:id` - Retrieve a specific employee by ID.
- `POST /api/employees` - Create a new employee (supports `multipart/form-data` for images).
- `PUT /api/employees/:id` - Update an existing employee.
- `DELETE /api/employees/:id` - Delete an employee.
