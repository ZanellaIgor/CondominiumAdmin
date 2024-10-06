import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import { SidebarLayout } from '@components/Layouts/SidebarLayout';
import { Loader } from '@src/components/Common/Loader';

import { ProtectedRoute } from '@src/utils/protectedRoute/ProtectedRoute';
import { lazy } from 'react';

const HomePage = Loader(lazy(() => import('../pages/Home/Home')));

const WarningsPage = Loader(lazy(() => import('../pages/Warnings/Warnings')));

const ReservationPage = Loader(
  lazy(() => import('../pages/Reservation/Reservation'))
);

const UserPage = Loader(lazy(() => import('../pages/User/User')));

const MaintenancePage = Loader(
  lazy(() => import('@src/pages/Maintenance/Maintenance'))
);

const SpaceReservationPage = Loader(
  lazy(() => import('@src/pages/SpaceReservation/SpaceReservation'))
);

const ApartamentPage = Loader(
  lazy(() => import('@src/pages/Apartament/Apartament'))
);

const DocumentsPage = Loader(
  lazy(() => import('../pages/Documents/Documents'))
);

const LoginPage = Loader(lazy(() => import('../pages/Login/Login')));

export const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
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
        element: <ReservationPage />,
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
        path: '/space-reservation',
        element: <SpaceReservationPage />,
      },
      {
        path: '/apartament',
        element: <ApartamentPage />,
      },

      { path: 'user', element: <UserPage /> },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
