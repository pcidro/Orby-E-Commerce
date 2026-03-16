import React from "react";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Context from "../../Contextos/Context";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { usuario, loading } = Context();
  if (loading) return null;
  if (usuario) return <Navigate to={from} replace />;

  return (
    <section>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
      </Routes>
    </section>
  );
};

export default Login;
