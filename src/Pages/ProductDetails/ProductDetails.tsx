import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IProducts, IApiResponse } from "../../Types";
import "./productdetails.css";
import Cart from "../../assets/cart.svg";
import toast from "react-hot-toast";
import Loader from "../../Helpers/Loader";
import CartContext from "../../Contextos/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<IProducts | null>(null);
  const { addItemCart } = CartContext();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`${import.meta.env.BASE_URL}sneakers.json`);
      const data: IApiResponse = await res.json();
      const product = data.products.find((item) => item.id === Number(id));
      setProduto(product || null);
    }
    getProduct();
  }, [id]);

  if (!produto) {
    return <Loader />;
  }

  function handleAddCart(produclicado: IProducts) {
    if (!selectedSize) {
      toast.error("Selecione um tamanho!");
      return;
    }
    const produtoComTamanho = {
      ...produclicado,
      size: selectedSize,
    };

    addItemCart(produtoComTamanho);
    toast.success("Produto adicionado ao carrinho!");
    navigate("../carrinho");
  }

  const precoFormatado = produto.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const valorParcela = (produto.price / 6).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="details-container">
      <div className="product-image-section">
        <img src={produto.image} alt={produto.title} className="main-image" />
      </div>

      <div className="product-info-section">
        <span className="badge-bestseller">MAIS DESEJADOS</span>

        <h1 className="product-title">{produto.title}</h1>

        <div className="price-container">
          <span className="product-price">{precoFormatado}</span>
          <span className="product-subtitle">
            {produto.brand.toUpperCase()} - {produto.category.toUpperCase()}
          </span>
          <span className="installments">
            em até 6x de {valorParcela} sem juros
          </span>
        </div>

        <p className="product-description">{produto.description}</p>

        <p className="product-release">Lançamento: {produto.releaseYear}</p>

        <div className="color-section">
          <span className="color-label">
            Cor:<strong>{produto.color}</strong>
          </span>
          <div className="color-thumbnails">
            <div className="thumbnail active">
              <img src={produto.image} />
            </div>
          </div>
        </div>

        <div className="size-selector-container">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="size-selector"
            defaultValue=""
          >
            <option value="" disabled>
              Escolha um tamanho
            </option>
            {produto.sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="shipping-info">
          <p>{produto.shippingInformation}</p>
          <p>{produto.warrantyInformation}</p>
        </div>

        <button
          onClick={() => handleAddCart(produto)}
          className="button-cart-premium"
        >
          Adicionar ao carrinho
          <img src={Cart} alt="Add to cart icon" className="cart-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
