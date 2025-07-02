
import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login";
import App from "./App.tsx"
import ErrorPage from "./pages/ErrorPage";
import Landing from "./pages/Landing";
import NewVehicles from "./pages/NewVehicles";
import Signup from "./pages/Signup";
import NewComments from "./pages/NewComments";
import DisplayComments from "./pages/DisplayComments.tsx";
import DisplayVehicles from "./pages/DisplayVehicles";
import NewGasEntry from "./pages/NewGasEntry.tsx";
import DisplayRecords from "./pages/DisplayRecords.tsx";
import NewMaintenance from "./pages/NewMaintenanceEntry.tsx";
import { AuthProvider } from "./context/AuthContext";
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [

      {
        index: true,
        element: <Landing />
      },
      {
        path: '/landing',
        element: <Landing />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/NewVehicles',
        element: <NewVehicles />
      },
       {
        path: '/NewMaintenance',
        element: <NewMaintenance />
      },
       {
        path: '/NewGasEntry',
        element: <NewGasEntry />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/newComments',
        element: <NewComments />
      },
      {
        path: '/DisplayComments',
        element: <DisplayComments />
      },
       {
        path: '/DisplayRecords/:vehicleId',
        element: <DisplayRecords />
      },
      {
        path: '/DisplayVehicles',
        element: <DisplayVehicles />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}
