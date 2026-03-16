import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Orders from "../Contextos/OrderContext";

const FinishOrder = () => {
  const { orders } = Orders();
  const navigate = useNavigate();
  const lastOrder = orders[0];

  useEffect(() => {
    if (orders.length === 0) {
      navigate("/");
    }
  }, [orders, navigate]);

  return (
    <div className="finishOrder">
      <h1>Pedido Finalizado!</h1>

      <div className="infos-order">
        <p>Obrigado pela compra!</p>
        <span>
          Código do seu pedido: <strong>{lastOrder.id}</strong>
        </span>
        <p>Data do pedido: {lastOrder.date}</p>

        <div>
          <p>Para acompanhar o status do seu pedido, acesse:</p>
          <Link to="/pedidos">Ir para Meus pedidos</Link>
        </div>
      </div>
    </div>
  );
};

export default FinishOrder;
