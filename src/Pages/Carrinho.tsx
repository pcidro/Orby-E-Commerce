import React from "react";
import "../css/carrinho.css";

const Carrinho = () => {
  return (
    <div className="container-carrinho">
      <h1>Meu carrinho</h1>

      <div className="lista-produtos">
        <section className="item-cart">
          <div className="produto-info">
            <img
              src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-4-select-202409_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=WnVKRVRUTFVsYThXaWkydWViL1Q3YmRudmFtWnZKZ0szeGF4cDZsczlhOWU5bTRrM1hZbmw5eCtiRXdXMENIbGg5cFlXTXBPaHRzU3RjRTMyRlg3eTd0UkdMSDBFQ1ZUdTNVa3daQmFjd1hvRUpUejJXeHlMOSsrLy9ZbWFSbmo"
              alt="AirPods"
            />
            <h2 className="produto-nome">Apple AirPods 4</h2>
          </div>

          <div className="produto-preco">
            <span>Preço:</span>
            <strong>R$ 1.000,00</strong>
          </div>

          <div className="flex-cart">
            <button className="btn-cart minus">-</button>
            <span className="quantity">1</span>
            <button className="btn-cart plus">+</button>
          </div>

          <div className="produto-subtotal">
            <span>SubTotal:</span>
            <strong>R$ 1.000,00</strong>
          </div>
        </section>
      </div>

      <div className="resumo-carrinho">
        <strong className="total">Total:</strong>
        <span className="valor-total">R$ 1.000,00</span>
      </div>
    </div>
  );
};

export default Carrinho;
