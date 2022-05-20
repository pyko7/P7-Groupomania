import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginContext from "../context/logContext";

const ProtectedRoutes = () => {
  const { isLogged } = useContext(LoginContext);

  /* si isLogged est null on retourne null, si il est false, on redirige vers /login si c'est true
  on donne accès aux routes protégées */

  return isLogged === null ? null : isLogged === false ? (
    <Navigate to="/auth/login" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
