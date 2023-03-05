import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import React from "react";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    auth: true,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];
