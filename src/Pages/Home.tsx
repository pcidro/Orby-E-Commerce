import React, { useEffect, useState } from "react";
import type { IProducts } from "../Types";
import type { IApiResponse } from "../Types";
import Cart from "../assets/cart.svg";
import "../css/home.css";
import Context from "../Context";
import { Link } from "react-router-dom";
import Hero from "../Components/Hero";
import Perks from "../Components/Perks";
import toast from "react-hot-toast";

const Home = () => {
  const [produtos, setProdutos] = useState<IProducts[] | []>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const { search, addItemCart } = Context();

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/sneakers.json");
        const data: IApiResponse = await res.json();
        if (search) {
          const searchTerm = search.trim().toLowerCase();
          const produtosItens = data.products.filter(
            (produto) =>
              produto.title.toLowerCase().includes(searchTerm) ||
              produto.category.toLowerCase().includes(searchTerm) ||
              produto.brand.toLowerCase().includes(searchTerm),
          );
          setProdutos(produtosItens);
        } else {
          setProdutos(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [search]);

  const produtosFiltrados = produtos?.filter((produto) => {
    const matchCategoria =
      categoriaSelecionada === "" || produto.brand === categoriaSelecionada;
    return matchCategoria;
  });

  function handleAddCart(produtoclicado: IProducts) {
    toast.success("Produto adicionado ao carrinho!");
    addItemCart(produtoclicado);
  }

  return (
    <div>
      <Hero />
      <Perks />
      <div className="container">
        <h1 className="main-title">Produtos em destaque</h1>
        <ul className="products-container">
          {produtos.map((produto) => (
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
    </div>
  );
};

export default Home;
