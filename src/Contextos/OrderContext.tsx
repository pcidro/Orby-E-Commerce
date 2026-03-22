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
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";
export interface IOrder {
  id: string;
  items: cartProps[];
  total: string;
  date: string;
  userId: string;
}

interface OrderContextData {
  orders: IOrder[];
  saveOrder: (items: cartProps[], total: string) => Promise<void>;
  removeOrder: (id: string) => Promise<void>;
  isNewOrder: boolean;
  setIsNewOrder: (value: boolean) => void;
}

const OrderContext = createContext<OrderContextData | null>(null);

const Orders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders deve estar dentro do OrderProvider");
  return context;
};

const OrderProvider = ({ children }: PropsWithChildren) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
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
              ...(doc.data() as Omit<IOrder, "id">),
            })) as IOrder[];

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
      const newOrder: IOrder = {
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

  async function removeOrder(id: string) {
    try {
      await deleteDoc(doc(db, "orders", id));

      setOrders((prev) => prev.filter((order) => order.id !== id));

      toast.success("Pedido cancelado!");
    } catch (error) {
      console.error("Erro ao remover pedido:", error);
      toast.error("Erro ao remover pedido.");
    }
  }

  return (
    <OrderContext.Provider
      value={{ orders, saveOrder, isNewOrder, setIsNewOrder, removeOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { Orders, OrderProvider };
