import React, { useState } from "react";
import CreditCard from "./CreditCard";
import creditImg from "../../assets/creditcard.svg";
import Pix from "../../assets/pix.svg";
import "./checkoutpagamento.css";

const CheckoutPagamento = () => {
  const [method, setMethod] = useState("");
  return (
    <div className="step-container">
      <h3>Selecione o metodo de pagamento:</h3>
      <div className="payment-method-container ">
        <label className="payment-option">
          <input
            type="radio"
            name="method"
            value="credit"
            checked={method === "credit"}
            onChange={({ target }) => setMethod(target.value)}
          />
          <img className="img-payment" src={creditImg} alt="" />
          <span>Cartão de credito</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="method"
            value="pix"
            checked={method === "pix"}
            onChange={({ target }) => setMethod(target.value)}
          />
          <img className="img-payment" src={Pix} alt="" />
          <span>Pix</span>
        </label>
      </div>

      {method === "credit" && <CreditCard />}
      <button>Finalizar Pedido</button>
    </div>
  );
};

export default CheckoutPagamento;
