import React, { useState } from "react";
import Orby from "../assets/orby.png";
import "../css/header.css";
import Cart from "../assets/cart.svg";
import searchIcon from "../assets/search.svg";
import Context from "../Context";

const Header = () => {
  const { setSearch } = Context();
  const [inputValue, setInputValue] = useState("");

  function searchItem() {
    setSearch(inputValue);
  }
  return (
    <div className="header-bg">
      <header className="header">
        <img className="logo" src={Orby} alt="Logo da Orby" />
        <div className="input-wrapper">
          <input
            className="input-header"
            type="text"
            onChange={({ target }) => setInputValue(target.value)}
            placeholder="Search for a product..."
            onKeyDown={(e) => e.key === "Enter" && searchItem()}
          />
          <button
            className="search-btn"
            aria-label="Search"
            onClick={searchItem}
          >
            <img src={searchIcon} alt="" />
          </button>
        </div>
        <img className="cart" src={Cart} alt="" />
      </header>
    </div>
  );
};

export default Header;
