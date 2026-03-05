import React, { type PropsWithChildren } from "react";
import type { IProducts } from "./Types";

interface iUiContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cart: cartProps[];
  cartAmount: number;
  setCart: React.Dispatch<React.SetStateAction<cartProps[]>>;
  addItemCart: (newItem: IProducts) => void;
  removeItemCart: (product: cartProps) => void;
  total: string;
  increaseItem: (id: number) => void;
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
  const [total, setTotal] = React.useState("");

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
      totalResultCart(cartList);
      return;
    }
    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);
  }

  function increaseItem(id: number) {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const amount = item.amount + 1;
        return {
          ...item,
          amount,
          total: amount * item.price,
        };
      }
      return item;
    });
    setCart(newCart);
    totalResultCart(newCart);
  }

  function removeItemCart(product: cartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);
    if (cart[indexItem].amount > 1) {
      const newCart = [...cart];
      newCart[indexItem] = {
        ...newCart[indexItem],
        amount: newCart[indexItem].amount - 1,
        total: (newCart[indexItem].amount - 1) * newCart[indexItem].price,
      };
      setCart(newCart);
      totalResultCart(newCart);
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
  }

  function totalResultCart(produtos: cartProps[]) {
    const myCart = produtos;
    const result = myCart.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    setTotal(result);
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
        total,
        removeItemCart,
        increaseItem,
      }}
    >
      {children}
    </ContextUi.Provider>
  );
};

export default Context;
