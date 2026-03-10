import React, { useEffect } from "react";
import "../css/carrinho.css";
import Context from "../Context";
import { Link } from "react-router-dom";
import arrowRight from "../assets/arrowright.svg";

const Carrinho = () => {
  const { cart, total, increaseItem, removeItemCart } = Context();

  return (
    <div className="container-carrinho">
      <h1>Meu carrinho</h1>

      <div className="lista-produtos">
        {cart.length === 0 && (
          <div className="noproducts">
            <p> Ops! Seu carrinho está vazio!</p>
            <Link to="/">Acessar produtos</Link>
          </div>
        )}
        {cart.map((item) => (
          <section key={item.id} className="item-cart">
            <div className="produto-info">
              <img src={item.image} alt="AirPods" />
              <h2 className="produto-nome">{item.title}</h2>
            </div>

            <div className="produto-preco">
              <span>Price:</span>
              <strong>{item.price}</strong>
            </div>

            <div className="produto-tamanho">
              <span>Tamanho:</span>
              <strong>{item.size}</strong>
            </div>

            <div className="flex-cart">
              <button
                onClick={() => removeItemCart(item)}
                className="btn-cart minus"
              >
                -
              </button>
              <span className="quantity">{item.amount}</span>
              <button
                onClick={() => increaseItem(item.id)}
                className="btn-cart plus"
              >
                +
              </button>
            </div>

            <div className="produto-subtotal">
              <span>SubTotal:</span>
              <strong>{item.total.toFixed(2)}</strong>
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
          <Link className="checkout-button" to="/checkout">
            Ir para pagamento
            <img src={arrowRight} alt="" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Carrinho;
