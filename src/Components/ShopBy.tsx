import React from "react";
import "../css/shopby.css";
import { Link } from "react-router-dom";

const ShopBy = () => {
  const brands = [
    { name: "Nike", image: "/products/nike2.png" },
    { name: "Adidas", image: "/products/adidas2.png" },
    { name: "Puma", image: "/products/puma1.png" },
    { name: "Jordan", image: "/products/jordan1.png" },
    { name: "Converse", image: "/products/converse1.png" },
  ];
  return (
    <section className="shop-by-brand">
      <h1>Compre por marca</h1>
      <ul className="brands-grid">
        {brands.map((brand) => (
          <li key={brand.name} className="brand-item">
            <Link
              to={`/brand/${brand.name.toLowerCase()}`}
              key={brand.name}
              className="brand-link"
            >
              <img src={brand.image} alt={brand.name} />
              <span>{brand.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ShopBy;
