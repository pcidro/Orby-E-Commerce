import React from "react";

import "./mainbanner.css";
import { Link } from "react-router-dom";

const MainBannerhome = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1 className="banner-title">
          Desconto em produtos da <span>Nike!</span>
        </h1>
        <p className="banner-subtitle">
          Confira as melhores ofertas da temporada com até 50% OFF.
        </p>
        <Link to="/brand/nike" className="banner-btn">
          Veja os preços
        </Link>
      </div>
    </section>
  );
};

export default MainBannerhome;
