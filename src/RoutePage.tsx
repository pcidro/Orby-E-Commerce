import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import { UiContextProvider } from "./Context";
import Carrinho from "./Pages/Carrinho";
const RoutePage = () => {
  return (
    <UiContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </BrowserRouter>
    </UiContextProvider>
  );
};

export default RoutePage;
