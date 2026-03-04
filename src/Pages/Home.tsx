import React, { useEffect, useState } from "react";
import type { IProducts } from "../Types";
import type { IApiResponse } from "../Types";
import Cart from "../assets/cart.svg";
import "../css/home.css";
import Context from "../Context";

const Home = () => {
  const [produtos, setProdutos] = useState<IProducts[] | []>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const { search } = Context();

  useEffect(() => {
    async function getProducts() {
      if (search) {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${search}`,
        );
        const data: IApiResponse = await res.json();
        setProdutos(data.products);
      } else {
        const [
          womenShoes,
          womenDresses,
          menShoes,
          mensShirts,
          mensWatches,
          womensWatches,
        ]: IApiResponse[] = await Promise.all([
          fetch("https://dummyjson.com/products/category/womens-shoes").then(
            (r) => r.json(),
          ),
          fetch("https://dummyjson.com/products/category/womens-dresses").then(
            (r) => r.json(),
          ),
          fetch("https://dummyjson.com/products/category/mens-shoes").then(
            (r) => r.json(),
          ),
          fetch("https://dummyjson.com/products/category/mens-shirts").then(
            (r) => r.json(),
          ),
          fetch("https://dummyjson.com/products/category/mens-watches").then(
            (r) => r.json(),
          ),
          fetch("https://dummyjson.com/products/category/womens-watches").then(
            (r) => r.json(),
          ),
        ]);

        const allProducts: IProducts[] = [
          ...womenShoes.products,
          ...womenDresses.products,
          ...menShoes.products,
          ...mensShirts.products,
          ...mensWatches.products,
          ...womensWatches.products,
        ];
        setProdutos(allProducts);
      }
    }
    getProducts();
  }, [search]);

  const produtosFiltrados = produtos?.filter((produto) => {
    const matchCategoria =
      categoriaSelecionada === "" || produto.category === categoriaSelecionada;
    return matchCategoria;
  });

  return (
    <div className="container">
      <aside className="aside">
        <h1>Categories</h1>

        <div className="input-group">
          <input
            type="radio"
            name="category"
            id="all"
            value=""
            checked={categoriaSelecionada === ""}
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
          <label htmlFor="all">All Products</label>
        </div>

        <div className="input-group">
          <input
            type="radio"
            name="category"
            id="mens-shirts"
            value="mens-shirts"
            checked={categoriaSelecionada === "mens-shirts"}
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
          <label htmlFor="mens-shirts">Mens Shirts</label>
        </div>

        <div className="input-group">
          <input
            type="radio"
            name="category"
            id="mens-shoes"
            value="mens-shoes"
            checked={categoriaSelecionada === "mens-shoes"}
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
          <label htmlFor="mens-shoes">Mens Shoes</label>
        </div>

        <div className="input-group">
          <input
            type="radio"
            name="category"
            id="womens-dresses"
            value="womens-dresses"
            checked={categoriaSelecionada === "womens-dresses"}
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
          <label htmlFor="womens-dresses">Womens Dresses</label>
        </div>

        <div className="input-group">
          <input
            type="radio"
            name="category"
            id="womens-shoes"
            value="womens-shoes"
            checked={categoriaSelecionada === "womens-shoes"}
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
          <label htmlFor="womens-shoes">Womens Shoes</label>
        </div>
      </aside>

      <ul className="products-container">
        {produtosFiltrados.map((produto) => (
          <li className="product" key={produto.id}>
            <img src={produto.images[0]} alt={produto.title} />
            <span className="category">
              {produto.category.replace("-", " ")}
            </span>
            <h2>{produto.title}</h2>

            <div className="product-info">
              <span className="price">${produto.price}</span>
            </div>

            <div className="product-detail-wrapper">
              <button className="product-detail">View Details</button>
              <button className="button-cart">
                <img src={Cart} alt="Add to cart" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
