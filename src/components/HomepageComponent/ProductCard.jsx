import React, { useState } from "react";
import style from "./ProductCard.module.css";
import { useCart } from "../../context/CartContext";
import WishlistButton from "../ui/FavoriteBtn";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  title,
  category,
  oldPrice,
  price,
  image,
}) {
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const { user } = useAuth();

  const handleAdd = e => {
    if (!user) {
      e.stopPropagation();
      e.preventDefault();
      toast.error("Please login to add items to cart");
      return;
    } else {
      e.stopPropagation();
      e.preventDefault();
      addToCart({ id, title, category, price, oldPrice, image, quantity: 1 });

      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  return (
    <div
      className={`card shadow-lg border-0 h-100 ${style.productCard} position-relative`}
    >

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
          <span className={`text-primary fw-bold ${style.currentPrice}`}>
            ${price}
          </span>
          {oldPrice && (
            <span
              className={`text-muted text-decoration-line-through ${style.oldPrice}`}
            >
              ${oldPrice}
            </span>
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2 position-absolute top-0 end-0 pe-3">
          <WishlistButton productId={id} />
        </div>
      

        <button
          onClick={handleAdd}
          className="btn btn-dark btn-sm mt-2 position-sticky bottom-0 end-0 m-3 z-1"
        >
          Add to Cart
        </button>

        {/* ✅ الرسالة تحت الزرار */}
        {showMessage && (
          <div className="text-success mt-2" style={{ fontSize: "14px" }}>
            ✅ Product added to cart!
          </div>
        )}
      </div>
    </div>
  );
}
