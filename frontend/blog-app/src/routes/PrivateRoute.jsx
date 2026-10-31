import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import AuthLoader from "../components/Loader/AuthLoader";

function PrivateRoute({ allowedRoles }) {
  const { user, loading } = useContext(UserContext);
  // console.log(user);

  if (loading) {
    return <AuthLoader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
