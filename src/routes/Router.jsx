
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import SkillDetails from "../pages/SkillDetails";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";

import PrivateRoute from "../hooks/PrivateRoute";

function Router() {
    return (
        <Routes>
            {/* Main website layout */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

                {/* Skill details */}
                <Route path="/skill/:skillId" element={<SkillDetails />} />

                {/* Profile: UI-only for now */}
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Authentication layout */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
        </Routes>
    );
}

export default Router;
