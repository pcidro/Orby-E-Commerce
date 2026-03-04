import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IProducts } from "../Types";
import type { IApiResponse } from "../Types";
import "../css/productdetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<IProducts | null>(null);
  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduto(data);
    }
    getProduct();
  }, [id]);

  if (produto)
    return (
      <div className="details-container">
        <h1>{produto.title}</h1>
        <p>{produto.description}</p>
        <p>Price:{produto.price}</p>
        <img src={produto.images[0]} />
        <div className="reviews-section">
          {produto.reviews?.map((review, index) => (
            <div key={index}>
              <span>{review.reviewerName}</span>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default ProductDetails;
