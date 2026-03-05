import React, { type PropsWithChildren } from "react";
import type { IProducts } from "./Types";

interface iUiContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cart: cartProps[];
  cartAmount: number;
  setCart: React.Dispatch<React.SetStateAction<cartProps[]>>;
  addItemCart: (newItem: IProducts) => void;
}

interface cartProps {
  id: number;
  title: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  amount: number;
  total: number;
}

const ContextUi = React.createContext<iUiContext | null>(null);

export const Context = () => {
  const context = React.useContext(ContextUi);
  if (!context) throw new Error("useContext deve estar dentro do Provider");
  return context;
};

export const UiContextProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = React.useState("");
  const [cart, setCart] = React.useState<cartProps[]>([]);

  function addItemCart(newItem: IProducts) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);
    if (indexItem !== -1) {
      const cartList = [...cart];
      cartList[indexItem] = {
        ...cartList[indexItem],
        amount: cartList[indexItem].amount + 1,
        total: (cartList[indexItem].amount + 1) * cartList[indexItem].price,
      };
      setCart(cartList);
      return;
    }
    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
  }

  return (
    <ContextUi.Provider
      value={{
        search,
        setSearch,
        cart,
        setCart,
        cartAmount: cart.length,
        addItemCart,
      }}
    >
      {children}
    </ContextUi.Provider>
  );
};

export default Context;
