import { Home } from '@mui/icons-material';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import BaseLayout from './components/layouts/BaseLayout';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
