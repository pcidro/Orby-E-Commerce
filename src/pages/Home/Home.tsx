import React, { useEffect, useRef, useState } from "react";
import type { IProducts } from "../../types";
import type { IApiResponse } from "../../types";
import "./home.css";
import Hero from "../../components/home/Hero/Hero";
import Perks from "../../components/home/Perks/Perks";
import MainBannerhome from "../../components/home/MainBannerhome/MainBannerhome";
import ShopBy from "../../components/home/ShopBy/ShopBy";
import FeaturedProducts from "../../components/home/FeaturedProducts/FeaturedProducts";
import NewProducts from "../../components/home/NewProducts/NewProducts";
import SizeModal from "../../components/cart/SizeModal/SizeModal";
import ShoptheLook from "../../components/home/ShoptheLook/ShoptheLook";
import CartContext from "../../contexts/CartContext";
import Newsletter from "../../components/home/NewsLetter/NewsLetter";

const Home = () => {
  const [produtos, setProdutos] = useState<IProducts[] | []>([]);
  const { modal, setModal, selectedProduct } = CartContext();

  const ProductsRef = useRef<null | HTMLDivElement>(null);
  const scrollToSection = () => {
    if (ProductsRef.current) {
      ProductsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}sneakers.json`);
        const data: IApiResponse = await res.json();
        setProdutos(data.products);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  const FeaturedProductsArray = produtos?.slice(0, 4);
  const newProductsArray = produtos?.slice(6, 10);

  return (
    <>
      <Hero scroll={scrollToSection} />
      <Perks />
      <ShopBy />
      <FeaturedProducts
        ProductsRef={ProductsRef}
        featuredProductsArray={FeaturedProductsArray}
      />
      <MainBannerhome />
      <NewProducts newProductsArray={newProductsArray} />
      {modal && selectedProduct && (
        <SizeModal product={selectedProduct} onClose={() => setModal(false)} />
      )}
      <ShoptheLook />
      <Newsletter />
    </>
  );
};

export default Home;
