import React from "react";
import "./ProductCard.css";
import frame1 from "./image/frame1.svg";
import frame2 from "./image/frame2.svg";
import frame3 from "./image/frame3.svg";
import frame4 from "./image/frame4.svg";

const products = [
  { name: "프레임 1", image: frame1 },
  { name: "프레임 2", image: frame2 },
  { name: "프레임 3", image: frame3 },
  { name: "프레임 4", image: frame4 },
];

const ProductCard = () => {
  return (
    <div className="product-cards">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <div
            className="product-image"
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
          <h3>{product.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
