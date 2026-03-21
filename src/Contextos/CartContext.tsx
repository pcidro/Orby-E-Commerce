import React, { type PropsWithChildren } from "react";
import type { IProducts, cartProps } from "../Types";
import toast from "react-hot-toast";
import { Auth } from "./AuthContext";

interface iCartContext {
  cart: cartProps[];
  setCart: React.Dispatch<React.SetStateAction<cartProps[]>>;
  cartAmount: number;
  total: string;
  addItemCart: (newItem: IProducts) => void;
  removeItemCart: (product: cartProps) => void;
  increaseItem: (id: number, size: string) => void;
  sideCart: boolean;
  SetSideCart: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: IProducts | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProducts | null>>;
  handleOpenModal: (product: IProducts) => void;
}

const CartContextUi = React.createContext<iCartContext | null>(null);

export const CartContext = () => {
  const context = React.useContext(CartContextUi);
  if (!context) throw new Error("useCart deve estar dentro do CartProvider");
  return context;
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { usuario } = Auth();
  const [cart, setCart] = React.useState<cartProps[]>(() => {
    const savedCart = localStorage.getItem("cartOrby");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [total, setTotal] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [sideCart, SetSideCart] = React.useState(false);
  const [selectedProduct, setSelectedProduct] =
    React.useState<IProducts | null>(null);
  React.useEffect(() => {
    if (!usuario) {
      setCart([]);
      setTotal("0.00");
    }
  }, [usuario]);

  React.useEffect(() => {
    localStorage.setItem("cartOrby", JSON.stringify(cart));
  }, [cart]);

  function addItemCart(newItem: IProducts) {
    const indexItem = cart.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size,
    );
    if (indexItem !== -1) {
      const cartList = [...cart];
      cartList[indexItem] = {
        ...cartList[indexItem],
        amount: cartList[indexItem].amount + 1,
        total: (cartList[indexItem].amount + 1) * cartList[indexItem].price,
      };
      setCart(cartList);
      totalResultCart(cartList);
      SetSideCart(true);
      return;
    }
    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);
    SetSideCart(true);
  }

  function increaseItem(id: number, size: string) {
    const newCart = cart.map((item) => {
      if (item.id === id && item.size === size) {
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
    const indexItem = cart.findIndex(
      (item) => item.id === product.id && item.size === product.size,
    );
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

    const removeItem = cart.filter(
      (item) => item.id !== product.id || item.size !== product.size,
    );
    setCart(removeItem);
    toast.error("Produto removido do carrinho!");
    totalResultCart(removeItem);
  }

  function totalResultCart(produtos: cartProps[]) {
    const myCart = produtos;
    const result = myCart.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    setTotal(result);
  }

  function handleOpenModal(product: IProducts) {
    setSelectedProduct(product);
    setModal(true);
  }

  return (
    <CartContextUi.Provider
      value={{
        cart,
        setCart,
        cartAmount: cart.length,
        total,
        addItemCart,
        removeItemCart,
        increaseItem,
        sideCart,
        SetSideCart,
        modal,
        setModal,
        selectedProduct,
        setSelectedProduct,
        handleOpenModal,
      }}
    >
      {children}
    </CartContextUi.Provider>
  );
};

export default CartContext;
