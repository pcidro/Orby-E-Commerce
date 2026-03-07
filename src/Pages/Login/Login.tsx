import React from "react";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";

import { Routes, Route, Navigate } from "react-router-dom";

const Login = () => {
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
