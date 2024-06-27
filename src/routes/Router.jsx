import * as React from 'react';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import BookDetails from '../pages/BookDetails';
import FavoriteBooks from '../pages/FavoriteBooks';
import BookmarkedBooks from '../pages/BookmarkedBooks';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:id',
    element: <BookDetails />,
  },
  {
    path: '/FavoriteBooks',
    element: <FavoriteBooks />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/BookmarkedBooks',
    element: <BookmarkedBooks />,
    errorElement: <ErrorPage />,
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
