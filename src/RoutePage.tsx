import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Carrinho from "./Pages/Carrinho/Carrinho";
import Login from "./Pages/Login/Login";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Footer from "./Components/Footer/Footer";
import BrandPage from "./Pages/BrandPage/BrandPage";
import Checkout from "./Pages/Checkout/Checkout";
import Search from "./Pages/Search/Search";
import ProtectedRoute from "./ProtectedRoute";
import FinishOrder from "./Pages/FinishOrder/FinishOrder";
import Pedidos from "./Pages/Pedidos/Pedidos";
import SideCart from "./Components/SideCart/SideCart";

const RoutePage = () => {
  return (
    <>
      <Header />
      <SideCart />
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
