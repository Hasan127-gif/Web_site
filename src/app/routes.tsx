import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Roommates } from '../pages/Roommates';
import { Pets } from '../pages/Pets';
import { Furniture } from '../pages/Furniture';
import { NewListing } from '../pages/NewListing';
import { Layout } from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'roommates',
        element: <Roommates />,
      },
      {
        path: 'pets',
        element: <Pets />,
      },
      {
        path: 'furniture',
        element: <Furniture />,
      },
      {
        path: 'new-listing',
        element: <NewListing />,
      },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
