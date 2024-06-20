import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { SidebarLayout } from './components/layouts/SidebarLayout';
import { HomePage } from './components/pages/Home';

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
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
