import React, { type PropsWithChildren } from "react";
import Context from "./Context";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { usuario } = Context();
  const location = useLocation();
  return usuario ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
