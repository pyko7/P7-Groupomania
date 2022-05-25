import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginContext from "../context/logContext";

const ProtectedRoutes = () => {
  const { isLogged } = useContext(LoginContext);
  
  /*if isLogged is null, return null but if it false the user is redirect to the login page*/
  return isLogged === null ? null : isLogged === false ? (
    <Navigate to="/auth/login" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
