import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Carrinho from "./Pages/Carrinho";
import Login from "./Pages/Login/Login";

const RoutePage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<ProductDetails />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login/*" element={<Login />} />
      </Routes>
    </>
  );
};

export default RoutePage;
