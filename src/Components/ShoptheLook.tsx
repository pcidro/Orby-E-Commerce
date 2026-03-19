import React from "react";
import "../css/shopthelook.css";
import shoptheLook1 from "../assets/shopthelook1.jpg";
import Instagram from "../assets/instagram.svg";
import { Link } from "react-router-dom";
import shoptheLook2 from "../assets/shopthelook2.jpg";
import shoptheLook3 from "../assets/shopthelook3.jpg";
import shoptheLook4 from "../assets/shopthelook4.jpg";

const ShoptheLook = () => {
  return (
    <section className="shopthelook">
      <div className="feed-header">
        <h1 className="main-title">Siga nosso estilo @OrbyShoes</h1>
        <p>Use a hashtag #OrbyStyle para aparecer aqui</p>
      </div>

      <div className="feed-grid">
        <div className="feed-item">
          <img src={shoptheLook1} alt="Sneaker converse" className="main-img" />

          <div className="overlay">
            <div className="instagram-section">
              <img className="instagram-icon" src={Instagram} alt="Instagram" />
              <span className="username">@JuLinKinshiri</span>
            </div>
            <div className="dividerlook"></div>
            <Link className="link-shopthelook" to={`/produto/3`}>
              Comprar
            </Link>
          </div>
        </div>
        <div className="feed-item">
          <img src={shoptheLook4} alt="Sneaker converse" className="main-img" />

          <div className="overlay">
            <div className="instagram-section">
              <img className="instagram-icon" src={Instagram} alt="Instagram" />
              <span className="username">@BronaliaSpencer</span>
            </div>
            <div className="dividerlook"></div>
            <Link className="link-shopthelook" to={`/produto/9`}>
              Comprar
            </Link>
          </div>
        </div>
        <div className="feed-item">
          <img src={shoptheLook3} alt="Sneaker converse" className="main-img" />

          <div className="overlay">
            <div className="instagram-section">
              <img className="instagram-icon" src={Instagram} alt="Instagram" />
              <span className="username">@LancesterDon</span>
            </div>
            <div className="dividerlook"></div>
            <Link className="link-shopthelook" to={`/produto/16`}>
              Comprar
            </Link>
          </div>
        </div>

        <div className="feed-item">
          <img src={shoptheLook2} alt="Sneaker converse" className="main-img" />

          <div className="overlay">
            <div className="instagram-section">
              <img className="instagram-icon" src={Instagram} alt="Instagram" />
              <span className="username">@JamesKoCinz</span>
            </div>
            <div className="dividerlook"></div>
            <Link className="link-shopthelook" to={`/produto/4`}>
              Comprar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoptheLook;
