/* import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
