import React, { type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Auth from "./Contextos/AuthContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { usuario } = Auth();
  const location = useLocation();
  return usuario ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
