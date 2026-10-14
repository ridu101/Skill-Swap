
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../hooks/PrivateRoute";

import Home from "../pages/Home";
import SkillDetails from "../pages/SkillDetails";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: "skill/:skillId",
                        element: <SkillDetails />,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
        ],
    },
]);
