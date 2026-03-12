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
            <p>Seu carrinho está vazio!</p>
            <Link to="/">Acessar produtos</Link>
          </div>
        )}
        {cart.map((produto) => (
          <section key={produto.id} className="item-cart">
            <div className="produto-info">
              <img src={produto.image} />
              <h2 className="produto-nome">{produto.title}</h2>
            </div>

            <div className="produto-preco">
              <span>Price:</span>
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
