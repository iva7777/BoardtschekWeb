import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  requiredRole?: string;
}

const AuthGuard: React.FC<Props> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
