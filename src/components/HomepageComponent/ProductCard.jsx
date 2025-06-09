import React from "react";
import style from './ProductCard.module.css';

export default function ProductCard({ title, category, oldPrice, price, image }) {
  return (
    <div className={`card shadow-lg border-0 h-100 ${style.productCard}`}>
      <img
        src={image}
        alt={title}
        className="card-img-top"
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className={`card-body ${style.productInfo} text-center`}>
        <h5 className={`card-title mb-2 ${style.productTitle}`}>{title}</h5>
        <p className="text-muted small mb-2">{category}</p>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className={`text-primary fw-bold ${style.currentPrice}`}>${price}</span>
          {oldPrice && (
            <span className={`text-muted text-decoration-line-through ${style.oldPrice}`}>
              ${oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
