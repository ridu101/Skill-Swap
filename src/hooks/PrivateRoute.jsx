
import { Outlet } from "react-router-dom";

function PrivateRoute() {
    // UI development phase: authentication will be added later.
    return <Outlet />;
}

export default PrivateRoute;
