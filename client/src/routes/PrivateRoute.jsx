import { useContext } from "react";
import { loginContext } from "../context/MyContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { loginAuth } = useContext(loginContext);
  return loginAuth ? <Outlet /> : <Navigate to="/login-register" />;
};

export default PrivateRoute;
