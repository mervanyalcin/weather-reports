import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import CityDetail from "./pages/CityDetail"

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
      {
        path: "/:city",
        element: <CityDetail />,
      }
    ],
  },
];
