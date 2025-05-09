
import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login";
import App from "./App.tsx"
import ErrorPage from "./pages/ErrorPage";
import Landing from "./pages/Landing";
import VIN from "./pages/Vin";
import NewVehicles from "./pages/NewVehicles";
import MpgCalculator from "./pages/MpgCalculator";
import Signup from "./pages/Signup";
import NewComments from "./pages/NewComments";
import DisplayComments from "./pages/DisplayComments.tsx";
import DisplayVehicles from "./pages/DisplayVehicles";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        path: '/vin',
        element: <VIN />
      },
      {
        path: '/NewVehicles',
        element: <NewVehicles />
      },
      {
        path: '/MpgCalculator',
        element: <MpgCalculator />
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
