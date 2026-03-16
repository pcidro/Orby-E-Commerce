import React from "react";
import Orders from "../Contextos/OrderContext";

const Pedidos = () => {
  const { orders, saveOrder } = Orders();
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <p>ID: {order.id}</p>
          <p>Data: {order.date}</p>
          <p>Total: {order.total}</p>
        </div>
      ))}
    </div>
  );
};

export default Pedidos;
