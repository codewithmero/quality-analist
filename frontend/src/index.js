import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import serviceWorker from './serviceWorker';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ViewReport from './pages/ViewReport/ViewReport.jsx';
import GenerateReport from './pages/GenerateReport/GenerateReport.jsx';
import Home from './pages/Home/Home.jsx';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchReports from './pages/SearchReports/SearchReports.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import ViewUsers from './pages/ViewUsers/ViewUsers.jsx';
import EditUser from './pages/EditUser/EditUser.jsx';
import ViewCategory from './pages/ViewCategory/ViewCategory.jsx';
import AddCategory from './pages/AddCategory/AddCategory.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ProtectedRoutes component={Home} />
      },
      {
        path: "generate-report",
        element: <ProtectedRoutes component={GenerateReport} />
      },
      {
        path: "view-report",
        element: <ProtectedRoutes component={ViewReport} />
      },
      {
        path: "search-reports",
        element: <ProtectedRoutes component={SearchReports} />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "view-users",
        element: <ProtectedRoutes component={ViewUsers} admin={true} />
      },
      {
        path: "edit-user",
        element: <ProtectedRoutes component={EditUser} admin={true} />
      },
      {
        path: "view-categories",
        element: <ProtectedRoutes component={ViewCategory} admin={true} />
      },
      {
        path: "add-category",
        element: <ProtectedRoutes component={AddCategory} admin={true} />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);

// Enabling service worker;
// serviceWorker();
