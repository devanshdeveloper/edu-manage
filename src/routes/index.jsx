import NotFoundPage from "../pages/404";
import AuthenticatedRoutes from "./AuthenticaledRoutes";
import AuthRoute from "./AuthRoute";
import UnauthenticatedRoutes from "./UnauthenticalRoutes";
import MainLayout from "../layouts/MainLayout";
import { Outlet } from "react-router-dom";
import ExampleRoutes from "./ExampleRoutes";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { element: <Outlet />, children: AuthenticatedRoutes },
      { element: <Outlet />, children: UnauthenticatedRoutes },
      { element: <Outlet />, children: ExampleRoutes },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
