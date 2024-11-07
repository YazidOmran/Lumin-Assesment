---

# 📋 Task Management Application

A simple yet functional task management app where users can create, view, edit, and delete tasks. Built with an ASP.NET Core Web API backend and a React.js frontend using Material-UI (MUI), and uses Auth0 authentication for secure access control.

---

## 🌟 Features

- **Task Management**: Perform CRUD (Create, Read, Update, Delete) operations for tasks.
- **Task Filtering**: Filter tasks by status (Pending or Completed).
- **User Authentication and Authorization**: Integrated with Auth0 to allow secure login, logout, and access control based on user permissions.
- **User Information Display**: The header displays user profile information, including username, email, and permissions.
- **API Documentation**: Integrated Swagger for interactive API exploration.
- **Persistent Storage**: Utilizes SQLite for storing tasks.
- **Cross-Origin Requests (CORS)**: Supports communication between frontend and backend on different ports.

---

## 🛠️ Technology Stack

- **Backend**: ASP.NET Core Web API, Entity Framework Core, SQLite, Swagger
- **Frontend**: React.js, Material-UI (MUI)
- **User Profile & Authentication**: Auth0

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** and **npm** (for frontend)
- **.NET SDK** (for backend)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/YazidOmran/Lumin-Assesment
cd Lumin-Assesment
```

#### 2. Backend Setup

```bash
cd ../TaskManagerBackend
dotnet restore
dotnet build
dotnet run --launch-profile https --project TaskManagerBackend
```

This will start the backend server, usually at `https://localhost:5001/swagger/index.html`.

#### 3. Frontend Setup

```bash
cd ../task-manager-frontend
npm install
```

#### 4. Configure Auth0 in `index.js`

In the `index.js` file in the `task-manager-frontend` folder, update the Auth0 settings with your own credentials:

```javascript
<Auth0Provider
  domain="your-auth0-domain"
  clientId="your-auth0-client-id"
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: "https://your-api-identifier",
    scope: "email openid profile view:tasks create:tasks edit:tasks delete:tasks"
  }}
>
```

After configuring the settings, start the frontend:

```bash
npm start
```

The frontend will be accessible at `http://localhost:3000`.

---

## 📖 Usage

- **Access the Application**: Open `http://localhost:3000` in your browser to use the task management interface.
- **User Authentication**: Use Auth0 for secure login/logout. Only authenticated users with the necessary permissions can access specific features.
- **User Profile Popover**: You can click on the user avatar in the header to view email, roles, and permissions to ensure they are being fetched correctly.
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
- `Microsoft.AspNetCore.Authentication.JwtBearer` 
- `Microsoft.IdentityModel.Logging` 

### Frontend:
- `React.js`
- `Material-UI (MUI)`
- `@auth0/auth0-react` 

---

## 🎬 Demo Video
Here's a short demo video showcasing some app functionalities:

https://github.com/user-attachments/assets/3a44a09e-b9b6-4427-b1fa-e7749292ef96

---

## 📬 Contact

For any questions or issues, please contact [yaomran2@gmail.com].
