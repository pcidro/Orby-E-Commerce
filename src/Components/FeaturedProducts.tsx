import React from "react";
import arrowRight from "../assets/arrowright.svg";
import Context from "../Context";
import type { IProducts } from "../Types";
import toast from "react-hot-toast";
import Cart from "../assets/cart.svg";
import { Link } from "react-router-dom";

interface IFeaturedProjects {
  featuredProductsArray: IProducts[];
  ProductsRef: React.RefObject<HTMLUListElement | null>;
}

const FeaturedProducts = ({
  featuredProductsArray,
  ProductsRef,
}: IFeaturedProjects) => {
  const { addItemCart } = Context();

  function handleAddCart(produtoclicado: IProducts) {
    toast.success("Produto adicionado ao carrinho!");
    addItemCart(produtoclicado);
  }
  return (
    <div className="container">
      <h1 className="main-title">Produtos em destaque</h1>
      <ul ref={ProductsRef} className="products-container">
        {featuredProductsArray.map((produto) => {
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
                {isNike ? (
                  <div className="price-container">
                    <span className="price-old">${produto.price + 70}</span>

                    <span className="price-current">{produto.price}</span>
                  </div>
                ) : (
                  <span className="price">${produto.price}</span>
                )}
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

export default FeaturedProducts;
