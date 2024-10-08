import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login";
import App from "./App.tsx"
import ErrorPage from "./pages/ErrorPage";
import Landing from "./pages/Landing";
import VIN from "./pages/Vin";
import MpgCalculator from "./pages/MpgCalculator";
import Weather from "./pages/Weather";

import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
  //  element: <Login />,
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
        path: '/VIN',
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
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
