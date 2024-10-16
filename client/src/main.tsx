
import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login";
import App from "./App.tsx"
import ErrorPage from "./pages/ErrorPage";
import Landing from "./pages/Landing";
import VIN from "./pages/Vin";
import MpgCalculator from "./pages/MpgCalculator";
import Weather from "./pages/Weather";
import Signup from "./pages/Signup";
import NewComments from "./pages/NewComments";

import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
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
        path: '/MpgCalculator',
        element: <MpgCalculator />
      },
      {
        path: '/weather',
        element: <Weather />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/NewComments',
        element: <NewComments />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
  );
}
