import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "../../assets/cart.svg";
import { Link } from "react-router-dom";
import arrowRight from "../../assets/arrowright.svg";
import "./brandpage.css";
import type { IProducts, IApiResponse } from "../../Types";
import SizeModal from "../../Components/SizeModal/SizeModal";
import CartContext from "../../Contextos/CartContext";

const BrandPage = () => {
  const [produtos, setProdutos] = useState<IProducts[]>([]);
  const { modal, setModal, selectedProduct, handleOpenModal } = CartContext();
  const { brandName } = useParams();
  useEffect(() => {
    async function getProducts() {
      const res = await fetch(`${import.meta.env.BASE_URL}sneakers.json`);
      const data: IApiResponse = await res.json();
      setProdutos(data.products);
    }
    getProducts();
  }, []);
  const formattedName =
    (brandName?.charAt(0).toUpperCase() ?? "") + (brandName?.slice(1) ?? "");

  const produtosMarca = produtos?.filter(
    (product) =>
      product.brand.trim().toLowerCase() === brandName?.trim().toLowerCase(),
  );

  function handleAddCart(produtoclicado: IProducts) {
    handleOpenModal(produtoclicado);
  }

  return (
    <div className="container">
      <div className="title-content">
        <span className="orby-purple">{formattedName}</span> Sneakers
      </div>
      <p className="subtitle-brand">Os melhores Sneakers da {formattedName}</p>
      <ul className="products-container">
        {produtosMarca?.map((produto) => {
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
                    <span className="price-old">R${produto.price + 70}</span>

                    <span className="price">R${produto.price}</span>
                  </div>
                ) : (
                  <span className="price">R${produto.price}</span>
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
      {modal && selectedProduct && (
        <SizeModal product={selectedProduct} onClose={() => setModal(false)} />
      )}
    </div>
  );
};

export default BrandPage;
