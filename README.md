# 📋 Task Management Application

A simple yet functional task management app where users can create, view, edit, and delete tasks. Built with an ASP.NET Core Web API backend and a React.js frontend using Material-UI (MUI).

---

## 🌟 Features

- **Task Management**: Perform CRUD (Create, Read, Update, Delete) operations for tasks.
- **Task Filtering**: Filter tasks by status (Pending or Completed).
- **API Documentation**: Integrated Swagger for interactive API exploration.
- **Persistent Storage**: Utilizes SQLite for storing tasks.
- **Cross-Origin Requests (CORS)**: Supports communication between frontend and backend on different ports.

---

## 🛠️ Technology Stack

- **Backend**: ASP.NET Core Web API, Entity Framework Core, SQLite, Swagger
- **Frontend**: React.js, Material-UI (MUI)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** and **npm** (for frontend)
- **.NET SDK** (for backend)

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-link>
cd Lumin-Assesment
```

#### 2. Backend Setup

```bash
cd TaskManagerBackend
dotnet restore
dotnet ef database update
dotnet run
```

This will start the backend server, usually at `https://localhost:5001`.

#### 3. Frontend Setup

```bash
cd ../task-manager-frontend
npm install
npm start
```

The frontend will be accessible at `http://localhost:3000`.

---

## 📖 Usage

- **Access the Application**: Open `http://localhost:3000` in your browser to use the task management interface.
- **Explore API**: Access Swagger documentation at `https://localhost:5001/swagger` to test API endpoints directly.

---

## 📂 Project Structure

- **TaskManagerBackend**: Contains the backend API code.
- **task-manager-frontend**: Contains the React.js frontend code.

---

## 📋 Dependencies

### Backend:
- `Microsoft.EntityFrameworkCore.Sqlite`
- `Microsoft.EntityFrameworkCore.Tools`
- `Swashbuckle.AspNetCore`

### Frontend:
- `React.js`
- `Material-UI (MUI)`

---

## 📬 Contact

For any questions or issues, please contact [yaomran2@gmail.com].
