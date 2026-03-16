import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { cartProps } from "../Types";

interface Order {
  id: string;
  items: cartProps[];
  total: string;
  date: string;
}

interface OrderContextData {
  orders: Order[];
  saveOrder: (items: cartProps[], total: string) => void;
}

const OrderContext = createContext<OrderContextData | null>(null);

export const Orders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders deve estar dentro do OrderProvider");
  return context;
};

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("ordersOrby");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ordersOrby", JSON.stringify(orders));
  }, [orders]);

  function saveOrder(items: cartProps[], total: string) {
    const newOrder: Order = {
      id: String(Math.floor(Math.random() * 90000) + 10000),
      items: [...items],
      total,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    setOrders((prev) => [newOrder, ...prev]);
  }

  return (
    <OrderContext.Provider value={{ orders, saveOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default Orders;
