import React from "react";
import "../css/mainbanner.css";

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
        <button className="banner-btn">Veja os preços</button>
      </div>
    </section>
  );
};

export default MainBannerhome;
