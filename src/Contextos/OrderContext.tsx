import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { cartProps } from "../Types";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import toast from "react-hot-toast";
interface Order {
  id: string;
  items: cartProps[];
  total: string;
  date: string;
}

interface OrderContextData {
  orders: Order[];
  saveOrder: (items: cartProps[], total: string) => Promise<void>;
  isNewOrder: boolean;
  setIsNewOrder: (value: boolean) => void;
}

const OrderContext = createContext<OrderContextData | null>(null);

export const Orders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders deve estar dentro do OrderProvider");
  return context;
};

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isNewOrder, setIsNewOrder] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const fetchOrders = async () => {
          try {
            const q = query(
              collection(db, "orders"),
              where("userId", "==", currentUser.uid),
              orderBy("date", "desc"),
            );

            const querySnapshot = await getDocs(q);
            const loadedOrders = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Order, "id">),
            })) as Order[];

            setOrders(loadedOrders);
          } catch (err) {
            console.error("Erro ao carregar pedidos:", err);
          }
        };

        fetchOrders();
      } else {
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  async function saveOrder(items: cartProps[], total: string) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("Usuário não autenticado!");
      return;
    }
    try {
      const newOrderData = {
        userId: currentUser.uid,
        items: [...items],
        total,
        date: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, "orders"), newOrderData);
      const newOrder: Order = {
        id: docRef.id,
        ...newOrderData,
      };
      setOrders((prev) => [newOrder, ...prev]);
      setIsNewOrder(true);
    } catch (error) {
      console.error("Erro ao salvar pedido no Firebase:", error);
      toast.error("Houve um erro ao salvar seu pedido.");
    }
  }

  return (
    <OrderContext.Provider
      value={{ orders, saveOrder, isNewOrder, setIsNewOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default Orders;
