import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "../assets/cart.svg";
import { Link } from "react-router-dom";
import arrowRight from "../assets/arrowright.svg";
import toast from "react-hot-toast";

import type { IProducts, IApiResponse } from "../Types";
import Context from "../Context";

const BrandPage = () => {
  const [produtos, setProdutos] = useState<IProducts[]>([]);
  const { addItemCart } = Context();
  const { brandName } = useParams();
  useEffect(() => {
    async function getProducts() {
      const res = await fetch("/sneakers.json");
      const data: IApiResponse = await res.json();
      setProdutos(data.products);
      console.log("produtos:", produtos);
    }
    getProducts();
  }, []);
  const formattedName =
    (brandName?.charAt(0).toUpperCase() ?? "") + (brandName?.slice(1) ?? "");

  const produtosMarca = produtos?.filter(
    (product) =>
      product.brand.trim().toLowerCase() === brandName?.trim().toLowerCase(),
  );
  console.log("produtosMarca:", produtosMarca);

  function handleAddCart(produtoclicado: IProducts) {
    toast.success("Produto adicionado ao carrinho!");
    addItemCart(produtoclicado);
  }
  return (
    <div className="container">
      <h1>{formattedName} Sneakers</h1>
      <p>Os melhores Sneakers da {formattedName}</p>
      <ul className="products-container">
        {produtosMarca?.map((produto) => (
          <li className="product" key={produto.id}>
            <img src={produto.image} alt={produto.title} />
            <span className="category">
              {produto.category.replace("-", " ")}
            </span>
            <h2>{produto.title}</h2>

            <div className="product-info">
              <span className="price">${produto.price}</span>
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
        ))}
      </ul>
    </div>
  );
};

export default BrandPage;
