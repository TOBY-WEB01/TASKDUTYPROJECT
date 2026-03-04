import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home/Home";
import Alltask from "../pages/Task/Alltask";
import Newtask from "../pages/Task/Newtask";

import Rootlayout from "../layouts/Rootlayout";
import EditTask from "../pages/task/EditTask";


export default function AppRoutes() {
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
          element: <Alltask />,
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

