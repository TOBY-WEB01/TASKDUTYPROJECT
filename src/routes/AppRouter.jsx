import React from 'react'
import { createBrowserRouter } from 'react-router';
import Rootlayout from '../layouts/Rootlayout';

import Home from '../pages/Home/Home';
import EditTask from '../pages/task/EditTask';
import AllTask from '../pages/Task/Alltask';
import NewTask from '../pages/task/NewTasks';
import AllTasks from '../pages/task/AllTasks';


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
              element: <NewTask />,
            },
            {
              path: "task/alltask",
              element: <AllTasks />,
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
