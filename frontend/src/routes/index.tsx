import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute, RoleRoute, PublicOnlyRoute } from './ProtectedRoutes';
import { Login } from '../pages/Login';
import Layout from '../components/layout/Layout';
import Tickets from '../pages/Tickets';
import NewTicket from '../pages/NewTicket';

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: <Login /> },
    ],
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: '/tickets', element: <Tickets /> },
          { path: '/tickets/new', element: <NewTicket /> },
          
          {
            element: <RoleRoute allowedRoles={['admin']} />,
            children: [
              { path: '/users', element: <div>Users</div> },
              { path: '/offices', element: <div>Offices</div> },
            ],
          },
          
          { path: '/settings', element: <div>Settings</div> },
        ],
      },
    ],
  },

  { path: '/', element: <Navigate to="/tickets" /> },
]);