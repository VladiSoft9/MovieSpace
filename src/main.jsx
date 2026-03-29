import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import App from './pages/App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/app",
    element: <App />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)