import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute, RoleRoute, PublicOnlyRoute } from './ProtectedRoutes';

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: <div>Login Page</div> },
    ],
  },

  {
    element: <PrivateRoute />,
    children: [
      { path: '/dashboard', element: <div>Dashboard</div> },
      
      {
        element: <RoleRoute allowedRoles={['admin']} />,
        children: [
          { path: '/users', element: <div>Users</div> },
        ],
      },
    ],
  },

  { path: '/', element: <Navigate to="/login" /> },
]);