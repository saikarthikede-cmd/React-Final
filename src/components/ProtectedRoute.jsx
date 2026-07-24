import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// wraps a page and only lets it through if the user is logged in
// and (optionally) has one of the allowed roles
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
