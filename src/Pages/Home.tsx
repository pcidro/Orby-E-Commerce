import React, { useEffect, useRef, useState } from "react";
import type { IProducts } from "../Types";
import type { IApiResponse } from "../Types";
import "../css/home.css";
import Context from "../Context";
import Hero from "../Components/Hero";
import Perks from "../Components/Perks";
import MainBannerhome from "../Components/MainBannerhome";
import ShopBy from "../Components/ShopBy";
import FeaturedProducts from "../Components/FeaturedProducts";
import NewProducts from "../Components/NewProducts";
import Footer from "../Components/Footer";

const Home = () => {
  const [produtos, setProdutos] = useState<IProducts[] | []>([]);

  const { search } = Context();
  const ProductsRef = useRef<null | HTMLUListElement>(null);
  const scrollToSection = () => {
    if (ProductsRef.current) {
      ProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/sneakers.json");
        const data: IApiResponse = await res.json();
        if (search) {
          const searchTerm = search.trim().toLowerCase();
          const produtosItens = data.products.filter(
            (produto) =>
              produto.title.toLowerCase().includes(searchTerm) ||
              produto.category.toLowerCase().includes(searchTerm) ||
              produto.brand.toLowerCase().includes(searchTerm),
          );
          setProdutos(produtosItens);
        } else {
          setProdutos(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [search]);

  const FeaturedProductsArray = produtos?.slice(0, 6);
  const newProductsArray = produtos?.slice(6, 12);

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
    </>
  );
};

export default Home;
