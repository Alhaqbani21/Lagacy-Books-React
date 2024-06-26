import * as React from 'react';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/Login',
    element: <LoginPage />,
  },
  {
    path: '/SignUp',
    element: <SignUpPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
