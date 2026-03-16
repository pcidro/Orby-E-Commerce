import React from "react";
import { Link } from "react-router-dom";

const FinishOrder = () => {
  return (
    <div className="finishOrder">
      <h1>Pedido Finalizado!</h1>
      <div className="infos-order">
        Para acompanhar o status do seu pedido, acesse:{" "}
        <Link to="/pedidos">Meus pedidos</Link>
      </div>
    </div>
  );
};

export default FinishOrder;
