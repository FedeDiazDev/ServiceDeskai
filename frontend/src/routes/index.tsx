import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute, RoleRoute, PublicOnlyRoute } from './ProtectedRoutes';
import { Login } from '../pages/Login';
import Layout from '../components/layout/Layout';
import Tickets from '../pages/Tickets';
import NewTicket from '../pages/NewTicket';
import TicketDetail from '../pages/TicketDetail';
import Users from '../pages/admin/Users';
import Offices from '../pages/admin/Offices';
import CreateUser from '../pages/CreateUser';
import CreateOffice from '../pages/CreateOffice';
import Settings from '../pages/Settings';
import NotFoundPage from '../pages/404';

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
          { path: '/tickets/:id', element: <TicketDetail /> },
          { path: '/tickets/new', element: <NewTicket /> },

          {
            element: <RoleRoute allowedRoles={['admin']} />,
            children: [
              { path: '/users', element: <Users /> },
              { path: '/users/new', element: <CreateUser /> },
              { path: '/offices', element: <Offices /> },
              { path: '/offices/new', element: <CreateOffice /> },
            ],
          },

          { path: '/settings', element: <Settings /> },
        ],
      },
    ],
  },

  { path: '/', element: <Navigate to="/tickets" replace /> },
  { path: '*', element: <NotFoundPage /> },
]);