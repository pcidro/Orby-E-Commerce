import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { IProducts } from "../Types";
import type { IApiResponse } from "../Types";
import Cart from "../assets/cart.svg";
import arrowRight from "../assets/arrowright.svg";
import SizeModal from "../Components/SizeModal";
import CartContext from "../Contextos/CartContext";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [produtos, setProdutos] = useState<IProducts[]>([]);
  const query = searchParams.get("q");
  const { modal, handleOpenModal, setModal, selectedProduct } = CartContext();

  function handleAddCart(produtoclicado: IProducts) {
    handleOpenModal(produtoclicado);
  }

  useEffect(() => {
    async function getSearch() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}sneakers.json`);
        const data: IApiResponse = await res.json();
        if (query) {
          const filtered = data.products.filter(
            (p) =>
              p.title.toLowerCase().includes(query.toLowerCase()) ||
              p.brand.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()),
          );
          setProdutos(filtered);
        }
      } catch (erro) {
        console.log(erro);
      }
    }

    getSearch();
  }, [query]);

  return (
    <div className="container">
      <h1 className="main-title">Produtos em destaque</h1>
      <ul className="products-container">
        {produtos.map((produto) => {
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
                      <span className="price-old">R${produto.price + 70}</span>
                    )}
                    <span className="price">R${produto.price}</span>
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
        {produtos.length === 0 && query && (
          <p className="empty-message">Nenhum produto encontrado</p>
        )}
      </ul>
      {modal && selectedProduct && (
        <SizeModal product={selectedProduct} onClose={() => setModal(false)} />
      )}
    </div>
  );
};

export default Search;
