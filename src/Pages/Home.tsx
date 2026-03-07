import React, { useEffect, useRef, useState } from "react";
import type { IProducts } from "../Types";
import type { IApiResponse } from "../Types";
import Cart from "../assets/cart.svg";
import "../css/home.css";
import Context from "../Context";
import { Link } from "react-router-dom";
import Hero from "../Components/Hero";
import Perks from "../Components/Perks";
import toast from "react-hot-toast";
import arrowRight from "../assets/arrowright.svg";
import MainBannerhome from "../Components/mainBannerhome";

const Home = () => {
  const [produtos, setProdutos] = useState<IProducts[] | []>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const { search, addItemCart } = Context();
  const ProductsRef = useRef<null | HTMLUListElement>(null);
  const scrollToSection = () => {
    if (ProductsRef.current) {
      ProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const FeaturedProducts = produtos?.slice(0, 5);

  function handleAddCart(produtoclicado: IProducts) {
    toast.success("Produto adicionado ao carrinho!");
    addItemCart(produtoclicado);
  }

  return (
    <div>
      <Hero scroll={scrollToSection} />
      <Perks />
      <div className="container">
        <h1 className="main-title">Produtos em destaque</h1>
        <ul ref={ProductsRef} className="products-container">
          {FeaturedProducts.map((produto) => (
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
      <MainBannerhome />
    </div>
  );
};

export default Home;
