import { lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

import { SidebarLayout } from '@components/Layouts/SidebarLayout';
import { Loader } from '@src/components/Common/Loader';
import { ProtectedRoute } from '@src/utils/protectedRoute/ProtectedRoute';

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
const ApartmentPage = Loader(
  lazy(() => import('@src/pages/Apartment/Apartment'))
);
const CondominiumPage = Loader(
  lazy(() => import('@src/pages/Condominium/Condominium'))
);
const SurveyPage = Loader(lazy(() => import('../pages/Survey/Survey')));
const SurveyFormPage = Loader(
  lazy(() => import('../pages/Survey/Form/Survey.Form'))
);
const SurveyAnswerPage = Loader(
  lazy(() => import('@src/pages/Survey/Answer/Answer'))
);
const LoginPage = Loader(lazy(() => import('../pages/Login/Login')));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'warnings', element: <WarningsPage /> },
      { path: 'reservations', element: <ReservationPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: 'survey', element: <SurveyPage /> },
      { path: 'survey/create', element: <SurveyFormPage /> },
      { path: 'survey/edit/:id', element: <SurveyFormPage /> },
      { path: 'survey/answer/:id', element: <SurveyAnswerPage /> },
      { path: 'space-reservation', element: <SpaceReservationPage /> },
      { path: 'apartment', element: <ApartmentPage /> },
      { path: 'condominium', element: <CondominiumPage /> },
      { path: 'user', element: <UserPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
