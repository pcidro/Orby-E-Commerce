import React, { type PropsWithChildren } from "react";
import type { IProducts } from "./Types";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface iUiContext {
  loading: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cart: cartProps[];
  cartAmount: number;
  setCart: React.Dispatch<React.SetStateAction<cartProps[]>>;
  addItemCart: (newItem: IProducts) => void;
  removeItemCart: (product: cartProps) => void;
  total: string;
  usuario: User | null;
  increaseItem: (id: number) => void;
  handleLogout: () => void;
}

interface cartProps {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  amount: number;
  total: number;
  size: string;
}

type usuarioProps = null | User;

const ContextUi = React.createContext<iUiContext | null>(null);

export const Context = () => {
  const context = React.useContext(ContextUi);
  if (!context) throw new Error("useContext deve estar dentro do Provider");
  return context;
};

export const UiContextProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = React.useState<usuarioProps>(null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [cart, setCart] = React.useState<cartProps[]>(() => {
    const savedCart = localStorage.getItem("cartOrby");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [total, setTotal] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const login = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null);
        setCart([]);
        setTotal("0.00");
      }
      setLoading(false);
    });
    return () => login();
  }, []);

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

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
      setCart([]);
      setTotal("0.00");
    } catch (error) {
      console.error(error);
    }
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
    toast.error("Produto removido do carrinho!");
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
        loading,
        search,
        setSearch,
        cart,
        setCart,
        cartAmount: cart.length,
        addItemCart,
        total,
        removeItemCart,
        increaseItem,
        usuario,
        handleLogout,
      }}
    >
      {children}
    </ContextUi.Provider>
  );
};

export default Context;
