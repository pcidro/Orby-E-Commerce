import React from "react";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import { Routes, Route, Navigate } from "react-router-dom";
import Context from "../../Context";

const Login = () => {
  const { usuario, loading } = Context();
  if (loading) return null;
  if (usuario) return <Navigate to="/" />;
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
