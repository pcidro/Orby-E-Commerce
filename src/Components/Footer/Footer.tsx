import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./footer.css";
import orbyBlack from "../../assets/orbyblack.png";
import appleStore from "../../assets/applestore.svg";
import GooglePlay from "../../assets/googleplay.svg";
import Auth from "../../Contextos/AuthContext";

const Footer = () => {
  const { usuario } = Auth();

  return (
    <footer className="footer-bg">
      <div className="footer">
        <div className="footer-brand">
          <img className="footer-logo" src={orbyBlack} alt="Logotipo Orby" />
          <p>Os melhores Sneakers do mundo.</p>
        </div>

        <div className="footer-links">
          <h2>Contato</h2>
          <ul>
            <li>Email: contato@orby.com.br</li>
            <li>Telefone: (11) 99999-9999</li>
            <li>Localização: Rua 123 - São Paulo, SP</li>
          </ul>
        </div>

        <div className="footer-links">
          <h2>Minha Conta</h2>
          <ul>
            <li>
              <Link to="/carrinho">Ver Carrinho</Link>
            </li>
            <li>
              <Link to="/pedidos">Meus Pedidos</Link>
            </li>
            {!usuario && (
              <li>
                <Link to="/login">Entrar</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="app-section">
          <h3>Instale o nosso Aplicativo e obtenha descontos exclusivos!</h3>
          <p>Disponível para IOS e Android</p>
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
