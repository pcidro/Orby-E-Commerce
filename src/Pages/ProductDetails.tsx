import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IProducts } from "../Types";
import type { IApiResponse } from "../Types";
import "../css/productdetails.css";
import Cart from "../assets/cart.svg";
import Context from "../Context";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<IProducts | null>(null);
  const { addItemCart } = Context();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`/sneakers.json`);
      const data: IApiResponse = await res.json();
      const product = data.products.find((item) => item.id === Number(id));
      setProduto(product || null);
    }
    getProduct();
  }, [id]);

  if (!produto) {
    return <p>Loading...</p>;
  }

  function handleAddCart(produclicado: IProducts) {
    addItemCart(produclicado);
    toast.success("Produto adicionado ao carrinho!");
    navigate("../carrinho");
  }
  return (
    <div className="details-container">
      <h1>{produto.title}</h1>
      <p>{produto.description}</p>
      <p>Price:{produto.price}</p>
      <img src={produto.image} />
      <button onClick={() => handleAddCart(produto)} className="button-cart">
        <img src={Cart} alt="Add to cart" />
      </button>
    </div>
  );
};

export default ProductDetails;
