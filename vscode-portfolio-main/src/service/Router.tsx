import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../page/HomePage";
import AboutPage from "../page/AboutPage";
import ContactPage from "../page/ContactPage";
import ProjectPage from "../page/ProjectPage";
import SkillPage from "../page/SkillPage";
import SettingPage from "../page/SettingPage";
import NotFoundPage from "../page/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/project",
        element: <ProjectPage />,
      },
      {
        path: "/skills",
        element: <SkillPage />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
