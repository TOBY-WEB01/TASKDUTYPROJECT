import React from 'react'
import { createBrowserRouter } from 'react-router';
import Rootlayout from '../layouts/Rootlayout';

import Home from '../pages/Home/Home';
import Newtask from '../pages/Task/Newtask';
import EditTask from '../pages/task/EditTask';
import AllTask from '../pages/Task/Alltask';


export default function AppRouter() {
      const routes = [
        {
          path: "/",
          element: <Rootlayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "task/newtask",
              element: <Newtask />,
            },
            {
              path: "task/alltask",
              element: <AllTask />,
            },
            {
              path: "task/edittask",
              element: <EditTask />,
            },
          ],
        },
      ];


  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
