import React, { useState } from "react";
import Orby from "../assets/Orbylogo.png";
import "../css/header.css";
import Cart from "../assets/cart2.svg";
import searchIcon from "../assets/search.svg";
import Context from "../Context";
import { Link } from "react-router-dom";
import User from "../assets/user.svg";

const Header = () => {
  const { setSearch, cartAmount, usuario, handleLogout } = Context();
  const [inputValue, setInputValue] = useState("");

  function searchItem() {
    setSearch(inputValue);
  }
  return (
    <div className="header-bg">
      <header className="header">
        <Link to="/">
          <img className="logo" src={Orby} alt="Logo da Orby" />
        </Link>
        <div className="input-wrapper">
          <input
            className="input-header"
            type="text"
            onChange={({ target }) => setInputValue(target.value)}
            placeholder="Busque um sneaker..."
            onKeyDown={(e) => e.key === "Enter" && searchItem()}
          />
          <button
            className="search-btn"
            aria-label="Search"
            onClick={searchItem}
          >
            <img src={searchIcon} />
          </button>
        </div>
        {usuario ? (
          <>
            <div>
              <p>Olá, {usuario.displayName}!</p>
            </div>
          </>
        ) : (
          <Link to="/login" className="user-header-login">
            <img src={User} />
            Entrar
          </Link>
        )}

        <Link className="carrinho-link" to="/carrinho">
          <img className="cart" src={Cart} />
          {cartAmount > 0 && <span className="number-cart">{cartAmount}</span>}
        </Link>
        {usuario && <button onClick={handleLogout}>Sair</button>}
      </header>
    </div>
  );
};

export default Header;
