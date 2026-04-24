import React, { useEffect, useRef, useState } from "react";
import Orby from "../../assets/Orbylogo.png";
import "./header.css";
import Cart from "../../assets/cart2.svg";
import searchIcon from "../../assets/search.svg";
import { Link, useNavigate } from "react-router-dom";
import User from "../../assets/user.svg";
import arrowBotton from "../../assets/chevrondown.svg";
import pedidos from "../../assets/package.svg";
import logout from "../../assets/logout.svg";
import CartContext from "../../Contextos/CartContext";
import Search from "../../Contextos/SearchContext";
import Auth from "../../Contextos/AuthContext";
const Header = () => {
  const { usuario, handleLogout } = Auth();
  const { cartAmount } = CartContext();
  const { setSearch } = Search();

  const [inputValue, setInputValue] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [searchMobileAberto, setSearchMobileAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  function searchItem() {
    setSearch(inputValue);
    navigate(`/search?q=${inputValue}`);
    setInputValue("");
    setSearchMobileAberto(false);
  }

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    if (searchMobileAberto && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchMobileAberto]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuAberto &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuAberto(false);
      }
      if (
        searchMobileAberto &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchMobileAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto, searchMobileAberto]);

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
          <button className="search-btn" onClick={searchItem}>
            <img src={searchIcon} />
          </button>
        </div>
        <div ref={searchContainerRef} className="search-mobile-container">
          {!searchMobileAberto && (
            <button
              onClick={() => setSearchMobileAberto(true)}
              className="search-mobile-icon"
            >
              <img src={searchIcon} />
            </button>
          )}
          {searchMobileAberto && (
            <div className="search-mobile-input-wrapper">
              <input
                ref={searchInputRef}
                className="search-mobile-input"
                type="text"
                value={inputValue}
                onChange={({ target }) => setInputValue(target.value)}
                placeholder="Buscar..."
                onKeyDown={(e) => e.key === "Enter" && searchItem()}
              />
              <button className="search-mobile-btn" onClick={searchItem}>
                <img src={searchIcon} alt="Pesquisar" />
              </button>
            </div>
          )}
        </div>
        <div className="header-actions">
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
            {cartAmount > 0 && (
              <span className="number-cart">{cartAmount}</span>
            )}
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
