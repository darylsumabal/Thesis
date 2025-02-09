import { createBrowserRouter, Navigate } from "react-router";
import { Landing } from "./view/Landing";
import Home from "./view/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/"} />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home",
        element: <Navigate to={"/home"} />,
      },
    ],
  },
]);
