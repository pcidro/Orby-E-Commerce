import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Carrinho from "./Pages/Carrinho";
import Login from "./Pages/Login/Login";
import ProductDetails from "./Pages/ProductDetails";
import Footer from "./Components/Footer";
import BrandPage from "./Pages/BrandPage";
import Checkout from "./Pages/Checkout/Checkout";
import Search from "./Pages/Search";
import ProtectedRoute from "./ProtectedRoute";
import FinishOrder from "./Pages/FinishOrder";
import Pedidos from "./Pages/Pedidos";
import SideCart from "./Components/SideCart";
import { Context } from "./Contextos/Context";

const RoutePage = () => {
  const { sideCart, SetSideCart } = Context();
  return (
    <>
      <Header />
      {sideCart && <SideCart Close={() => SetSideCart(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/produto/:id" element={<ProductDetails />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/brand/:brandName" element={<BrandPage />} />
        <Route
          path="/checkout"
          element={<ProtectedRoute>{<Checkout />}</ProtectedRoute>}
        />
        <Route
          path="/finish"
          element={
            <ProtectedRoute>
              <FinishOrder />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
      <Footer />
    </>
  );
};

export default RoutePage;
