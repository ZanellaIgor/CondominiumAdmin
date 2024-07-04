import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import { SidebarLayout } from '@components/Layouts/SidebarLayout';
import { ComponentType, FC, Suspense, lazy } from 'react';

const Loader =
  (Component: ComponentType<any>): FC =>
  (props) =>
    (
      <Suspense fallback={<h1>Carregando</h1>}>
        <Component {...props} />
      </Suspense>
    );

const HomePage = Loader(lazy(() => import('./pages/Home/Home')));
const WarningsPage = Loader(lazy(() => import('./pages/Warnings/Warnings')));
const ReservationsPage = Loader(
  lazy(() => import('./pages/Reservations/Reservations'))
);
const MaintenancePage = Loader(
  lazy(() => import('./pages/Maintence/Maintence'))
);
const DocumentsPage = Loader(lazy(() => import('./pages/Documents/Documents')));
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
        path: '/warnings',
        element: <WarningsPage />,
      },
      {
        path: '/reservations',
        element: <ReservationsPage />,
      },
      {
        path: '/maintenance',
        element: <MaintenancePage />,
      },
      {
        path: '/documents',
        element: <DocumentsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
