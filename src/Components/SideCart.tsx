import React from "react";
import { Link } from "react-router-dom";
import "../css/sideCart.css";
import Cancel from "../assets/cancel.svg";
import arrowRight from "../assets/arrowright.svg";
import CartContext from "../Contextos/CartContext";

const SideCart = () => {
  const { sideCart, SetSideCart, cart, total, increaseItem, removeItemCart } =
    CartContext();

  React.useEffect(() => {
    if (cart.length === 0) {
      SetSideCart(false);
    }
  }, [cart.length, SetSideCart]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      SetSideCart(false);
    }
  }

  function handleCheckout() {
    SetSideCart(false);
  }

  function handleViewCart() {
    SetSideCart(false);
  }

  return (
    <>
      {sideCart && (
        <div className="sidecart" onClick={handleBackdropClick}>
          <div className="sidecart-container">
            <div className="sidecart-header">
              <h2>Seu Carrinho</h2>
              <button
                className="sidecart-close"
                onClick={() => SetSideCart(false)}
              >
                <img src={Cancel} alt="Fechar" />
              </button>
            </div>

            <div className="sidecart-content">
              {cart.length === 0 ? (
                <div className="sidecart-empty">
                  <p>Seu carrinho está vazio!</p>
                </div>
              ) : (
                <div className="sidecart-items">
                  {cart.map((produto) => (
                    <div
                      key={`${produto.id}-${produto.size}`}
                      className="sidecart-item"
                    >
                      <div className="sidecart-item-image">
                        <img src={produto.image} alt={produto.title} />
                      </div>

                      <div className="sidecart-item-info">
                        <h3>{produto.title}</h3>
                        <div className="sidecart-item-details">
                          <span className="size-badge">
                            Tamanho: {produto.size}
                          </span>
                          <span className="price-badge">
                            R$ {produto.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="sidecart-item-controls">
                        <div className="quantity-controls">
                          <button
                            onClick={() => removeItemCart(produto)}
                            className="btn-qty minus"
                          >
                            -
                          </button>
                          <span className="qty-display">{produto.amount}</span>
                          <button
                            onClick={() =>
                              increaseItem(produto.id, produto.size)
                            }
                            className="btn-qty plus"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItemCart(produto)}
                          className="btn-remove"
                        >
                          <img src={Cancel} alt="" />
                        </button>
                      </div>

                      <div className="sidecart-item-subtotal">
                        R$ {produto.total.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="sidecart-footer">
                <div className="sidecart-total">
                  <span>Total:</span>
                  <strong>R$ {total}</strong>
                </div>

                <Link
                  to="/checkout"
                  className="sidecart-btn sidecart-btn-checkout"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                  <img src={arrowRight} alt="" />
                </Link>

                <Link
                  to="/carrinho"
                  className="sidecart-btn sidecart-btn-view"
                  onClick={handleViewCart}
                >
                  Ver Carrinho
                  <img src={arrowRight} alt="" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideCart;
