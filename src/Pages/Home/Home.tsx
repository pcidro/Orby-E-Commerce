import React, { useEffect, useRef, useState } from "react";
import type { IProducts } from "../../Types";
import type { IApiResponse } from "../../Types";
import "./home.css";
import Hero from "../../Components/Hero/Hero";
import Perks from "../../Components/Perks/Perks";
import MainBannerhome from "../../Components/MainBannerhome/MainBannerhome";
import ShopBy from "../../Components/ShopBy/ShopBy";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import NewProducts from "../../Components/NewProducts/NewProducts";
import SizeModal from "../../Components/SizeModal/SizeModal";
import ShoptheLook from "../../Components/ShoptheLook/ShoptheLook";
import CartContext from "../../Contextos/CartContext";
import Newsletter from "../../Components/NewsLetter/NewsLetter";

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
