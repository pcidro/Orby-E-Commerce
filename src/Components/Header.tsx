import React, { useEffect, useRef, useState } from "react";
import Orby from "../assets/Orbylogo.png";
import "../css/header.css";
import Cart from "../assets/cart2.svg";
import searchIcon from "../assets/search.svg";
import Context from "../Contextos/Context";
import { Link, useNavigate } from "react-router-dom";
import User from "../assets/user.svg";
import arrowBotton from "../assets/chevrondown.svg";
import meuPerfil from "../assets/meuperfil.svg";
import pedidos from "../assets/package.svg";
import logout from "../assets/logout.svg";

const Header = () => {
  const { setSearch, cartAmount, usuario, handleLogout } = Context();
  const [inputValue, setInputValue] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  function searchItem() {
    setSearch(inputValue);
    navigate(`/search?q=${inputValue}`);
    setInputValue("");
  }

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuAberto &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);

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
            value={inputValue}
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
          <div ref={menuRef} className="user-menu-container">
            <div
              onClick={toggleMenu}
              className={`header-info ${menuAberto ? "active" : ""}`}
            >
              <img src={User} alt="" />
              <p>
                Olá,{" "}
                {usuario.displayName ||
                  usuario.email?.split("@")[0] ||
                  "Usuário"}
                !
              </p>
              <img
                className={`arrow-icon ${menuAberto ? "open" : ""}`}
                src={arrowBotton}
                alt=""
              />
            </div>
            {menuAberto && (
              <div className="profile-dropdown">
                <Link
                  to="/pedidos"
                  onClick={() => setMenuAberto(false)}
                  className="dropdown-item"
                >
                  <img src={pedidos} alt="" />
                  Meus Pedidos
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                    setMenuAberto(false);
                  }}
                  className="logout-item"
                >
                  <img src={logout} alt="" />
                  Sair
                </button>
              </div>
            )}
          </div>
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
      </header>
    </div>
  );
};

export default Header;
