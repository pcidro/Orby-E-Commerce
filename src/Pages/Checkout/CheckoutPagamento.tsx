import React from "react";
import CreditCard from "./CreditCard";

const CheckoutPagamento = () => {
  return (
    <div className="step-container">
      <h3>Pagamento</h3>
      <p>Confira os dados antes de finalizar.</p>
      <CreditCard />
      <button>Finalizar Pedido</button>
    </div>
  );
};

export default CheckoutPagamento;
