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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "generate-report",
        element: <GenerateReport />
      },
      {
        path: "view-report",
        element: <ViewReport />
      },
      {
        path: "search-reports",
        element: <SearchReports />
      },
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
serviceWorker();
