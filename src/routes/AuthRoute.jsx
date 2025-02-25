import { Navigate, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function AuthRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
    }

    // else {
    //   navigate(permissions.findFirstPermissionRedirect()?.to || "/app");
    // }
  }, [user]);

  if (!user || !user._id) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

export default AuthRoute;
