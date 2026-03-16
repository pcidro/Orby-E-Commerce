import React from "react";
import Orders from "../Contextos/OrderContext";

const Pedidos = () => {
  const { orders } = Orders();
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <p>ID: {order.id}</p>
          <p>Data: {order.date}</p>
          <p>Total: {order.total}</p>
          <ul>
            {order.items.map((order) => (
              <li>
                <h1>{order.title}</h1>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Pedidos;
