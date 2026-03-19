import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Rootlayout from "../layouts/Rootlayout";

import Home from "../pages/Home/Home";
import EditTask from "../pages/task/EditTask";
import NewTask from "../pages/task/NewTasks";
import AllTasks from "../pages/task/AllTasks";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import LazySpinner from "../components/LazySpinner";
import { useAuth } from "../hooks/useAuth";
import { PrivateRoute } from "./ProtectedRoute";

export default function AppRouter() {
  const { accessToken } = useAuth();
  const routes = [
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <AuthLayout />
        </Suspense>
      ),
      children: [
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "auth/createAccount",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <Rootlayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "task/newtask",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <NewTask />
            </PrivateRoute>
          ),
        },
        {
          path: "task/alltask",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <AllTasks />
            </PrivateRoute>
          ),
        },
        {
          path: "/task/edit/:id",
          element: <EditTask />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
