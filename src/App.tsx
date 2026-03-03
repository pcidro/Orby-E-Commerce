import React, { useEffect, useState } from "react";
import type { IProducts } from "./Types";
import type { IApiResponse } from "./Types";
import "./App.css";
import Cart from "./assets/cart.svg";

const App = () => {
  const [produtos, setProdutos] = useState<IProducts[] | []>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    async function getProducts() {
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
        fetch("https://dummyjson.com/products/category/mens-shoes").then((r) =>
          r.json(),
        ),
        fetch("https://dummyjson.com/products/category/mens-shirts").then((r) =>
          r.json(),
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
    getProducts();
  }, []);

  const produtosFiltrados = produtos?.filter((produto) => {
    const matchCategoria =
      categoriaSelecionada === "" || produto.category === categoriaSelecionada;
    return matchCategoria;
  });

  return (
    <div className="container">
      <aside className="aside">
        <h1>Select your favorite category</h1>

        <div className="input-group">
          <label>All Products</label>
          <input
            type="radio"
            name="category"
            value=""
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
        </div>

        <div className="input-group">
          <label>Mens-shirts</label>
          <input
            type="radio"
            name="category"
            value="mens-shirts"
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
        </div>

        <div className="input-group">
          <label>Mens-shoes</label>
          <input
            type="radio"
            name="category"
            value="mens-shoes"
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
        </div>

        <div className="input-group">
          <label>Women-dresses</label>
          <input
            type="radio"
            name="category"
            value="womens-dresses"
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
        </div>

        <div className="input-group">
          <label>Women-shoes</label>
          <input
            type="radio"
            name="category"
            value="womens-shoes"
            onChange={({ target }) => setCategoriaSelecionada(target.value)}
          />
        </div>
      </aside>
      <ul className="products-container">
        {produtosFiltrados.map((produto) => (
          <li className="product" key={produto.id}>
            <img src={produto.images[0]} alt={produto.title} />
            <h2>{produto.title}</h2>
            <div>
              <span className="price">{produto.price}</span>-{" "}
              <span className="category">{produto.category}</span>
            </div>
            <button className="button-cart">
              <img src={Cart} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
