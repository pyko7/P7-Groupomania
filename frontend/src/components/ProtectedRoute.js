import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { loginContext } from "../context/context";

const ProtectedRoute = () => {
  const { isLogged } = useContext(loginContext);

  return isLogged === null ? null : isLogged === false ? (
    <Navigate to="/auth/login" />
  ) : (
    <Outlet />
  );
};
export default ProtectedRoute;
