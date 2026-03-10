import React from "react";
import arrowRight from "../assets/arrowright.svg";
import Context from "../Context";
import type { IProducts } from "../Types";
import toast from "react-hot-toast";
import Cart from "../assets/cart.svg";
import { Link } from "react-router-dom";

interface InewProducts {
  newProductsArray: IProducts[];
  handleOpenModal: (product: IProducts) => void;
}

const NewProducts = ({ newProductsArray, handleOpenModal }: InewProducts) => {
  function handleAddCart(produtoclicado: IProducts) {
    handleOpenModal(produtoclicado);
  }

  return (
    <div className="container">
      <h1 className="main-title">Novas Chegadas</h1>
      <ul className="products-container">
        {newProductsArray.map((produto) => {
          const isNike = produto.brand.toLowerCase().trim() === "nike";
          return (
            <li className="product" key={produto.id}>
              {isNike && <span className="discount-badge">-50% OFF</span>}
              <img src={produto.image} alt={produto.title} />
              <span className="category">
                {produto.category.replace("-", " ")}
              </span>
              <h2>{produto.title}</h2>

              <div className="product-info">
                <div className="product-info">
                  <div className="price-container-brand">
                    {isNike && (
                      <span className="price-old">${produto.price + 70}</span>
                    )}
                    <span className="price">${produto.price}</span>
                  </div>
                </div>
              </div>

              <div className="product-detail-wrapper">
                <Link to={`/produto/${produto.id}`} className="product-detail">
                  Ver Detalhes
                  <img src={arrowRight} alt="" />
                </Link>
                <button
                  onClick={() => handleAddCart(produto)}
                  className="button-cart"
                >
                  <img src={Cart} alt="Add to cart" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewProducts;
