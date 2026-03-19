import React, { useEffect } from "react";
import Context from "../Contextos/Context";
import { Link } from "react-router-dom";
import arrowRight from "../assets/arrowright.svg";
import "../css/sideCart.css";

interface iSideCart {
  Close: () => void;
}

const SideCart = ({ Close }: iSideCart) => {
  const { cart, total, increaseItem, removeItemCart } = Context();
  useEffect(() => {
    if (cart.length === 0) {
      Close();
    }
  }, [cart, Close]);

  return (
    <div className="side-cart-wrapper">
      <div className="cart-backdrop" onClick={Close}></div>
      <div className="container-carrinho-side">
        <h1>Meu carrinho</h1>
        <button onClick={() => Close()} className="close-btn">
          X
        </button>
        <div className="lista-produtos">
          {cart.map((produto) => (
            <section key={produto.id} className="item-cart">
              <div className="produto-info">
                <img src={produto.image} />
                <h2 className="produto-nome">{produto.title}</h2>
              </div>

              <div className="produto-preco">
                <span>Preço</span>
                <strong>{produto.price}</strong>
              </div>

              <div className="produto-tamanho">
                <span>Tamanho:</span>
                <strong>{produto.size}</strong>
              </div>

              <div className="flex-cart">
                <button
                  onClick={() => removeItemCart(produto)}
                  className="btn-cart minus"
                >
                  -
                </button>
                <span className="quantity">{produto.amount}</span>
                <button
                  onClick={() => increaseItem(produto.id, produto.size)}
                  className="btn-cart plus"
                >
                  +
                </button>
              </div>

              <div className="produto-subtotal">
                <span>SubTotal:</span>
                <strong>{produto.total.toFixed(2)}</strong>
              </div>
            </section>
          ))}
        </div>
        {cart.length !== 0 && (
          <>
            <div className="resumo-carrinho">
              <strong className="total">Total:</strong>
              <span className="valor-total">{total}</span>
            </div>
            <div className="buttons-cart-home">
              <Link className="checkout-button" to="/checkout">
                Ir para pagamento
                <img src={arrowRight} alt="" />
              </Link>
              <Link className="checkout-button" to="/carrinho">
                Ver meu carrinho
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideCart;
