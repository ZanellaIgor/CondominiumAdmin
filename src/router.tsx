import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import { SidebarLayout } from './components/Layouts/SidebarLayout';
import { HomePage } from './pages/Home/Home';
import { WarningsPage } from './pages/Warnings/Warnings';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/Warnings',
        element: <WarningsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
