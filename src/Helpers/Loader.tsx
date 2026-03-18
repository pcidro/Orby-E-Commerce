import React from "react";
import "./loading.css";

const Loader = () => {
  return (
    <div className="loader">
      <span className="loader-text">Carregando</span>
      <span className="load" />
    </div>
  );
};

export default Loader;
