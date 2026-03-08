import React from "react";
import "../css/footer.css";
import orbyBlack from "../assets/orbyblack.png";
import appleStore from "../assets/applestore.svg";
import GooglePlay from "../assets/googleplay.svg";

const Footer = () => {
  return (
    <footer className="footer-bg">
      <div className="footer">
        <div className="footer-brand">
          <img className="footer-logo" src={orbyBlack} alt="Logotipo Orby" />
          <p>Os melhores Sneakers do mundo.</p>
        </div>

        <div className="footer-links">
          <h2>Sobre</h2>
          <ul>
            <li>
              <a href="/sobre-nos">Sobre Nós</a>
            </li>
            <li>
              <a href="/contato">Entre em contato</a>
            </li>
            <li>
              <a href="/privacidade">Política de Privacidade</a>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h2>Minha Conta</h2>
          <ul>
            <li>
              <a href="/carrinho">Ver Carrinho</a>
            </li>
            <li>
              <a href="/login">Entrar</a>
            </li>
            <li>
              <a href="/ajuda">Ajuda</a>
            </li>
          </ul>
        </div>

        <div className="app-section">
          <h3>Instale o nosso Aplicativo!</h3>
          <p>Disponivel para IOS e Android</p>
          <div className="app-badges">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="store-link"
            >
              <img src={appleStore} alt="Baixar na Apple Store" />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="store-link"
            >
              <img src={GooglePlay} alt="Disponível no Google Play" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
