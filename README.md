# TaskFlow: Task Management System(MERN Stack)

A full-stack Task Management application build using MERN Stack technologies. This application allows users to securely register, login and manage their daily tasks with full CRUD functionality.

## Live Demo :

#### Frontend : https://task-management-system-frontend-ciqs-qtq6148xu.vercel.app/
#### Backend : https://task-management-system-vnp0.onrender.com 


## Features :

### user Authentication

*  Secure Signup: Users can create an account with Name,Email,and Password.
* Encrypted Passwords: Implementation of bcrypt for high-level password hashing.
* JWT-Authorization: Secure login system using JSON Web Tokens.
* Protected Routes: Only authenticated users can access the Task Dashboard.

### Task Management 
* Full CRUD: User can Create, Read, Update, and Delete tasks.
* Task Details: Each task includes a Title, Description, Due Date and Status.
* Status Tracking: Easily toggle tasks between Pending and Complete.
* User-Specific Data: Users can only view and manage tasks created by their own account.
* Task Statistics: Dashboard shows total,completed,and pending tasks.

### User Interface

* Responsive Design: Fully optimized for mobile, tablet, and desktop using TailwindCSS.
* Interactive Dashboard: A clean overview of all tasks with the real-time status updates.
* User Experience: Smooth navigation with React Router and intuitive form validations.


## Technologies Used :

### Frontend:

* React.js
* React Router
* Tailwind CSS
* React Router Dom 
* Axios
* React Icons
* React Toastify
* Vite

### Backend:

* Node.js & Express.js
* MongoDB & Mongoose (Database)
* JWT (Authentication)
* Bcrypt (Password Encryption)
* Cors & Dotenv


## Setup Instructions : 

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Frontend Setup : 

```bash
git clone  https://github.com/Anjana412/Task-management-system-frontend
cd Task-management-system-frontend
npm install
npm run dev
```

### Backend Setup :

```bash
git clone https://github.com/Anjana412/Task-management-system
cd Task-management-system
npm install
npm start
```


### Environment Variables
Frontend (.env):
```
VITE_BACKEND_URL=your_backend_url
```

Backend (.env):
```
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```


## Folder Structure

### Frontend
```
src/
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── CreateTask.jsx
│   ├── EditTask.jsx
│   └── Navbar.jsx    
├── api/
│   └── api.js
├── images/
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```


### Backend
```
├── controller/
│   ├── usercontroller.js
│   └── taskcontroller.js
├── middleware/
│   └── auth.js
├── models/
│   ├── user.js
│   └── task.js
├── Routes/
│   ├── userRoutes.js
│   └── taskRoutes.js
├── utils/
│   └── db.js
├── index.js
├── .env
└── package.json
```

### Author

**Anjana T**

Email: anjanat0001@gmail.com

GitHub: https://github.com/Anjana412