import React from "react";
import style from "./CartPage.module.css";
import { useCart } from "../../context/CartContext";


export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  // احسب الإجماليات
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = subtotal * 0.2;
  const delivery = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  return (
    <div className={style.container}>
      <h1 className={style.cartTitle}>Your Cart</h1>
      <div className={style.cartDiv}>
        {/* Right Section - Cart Items */}
        <div className={style.cartContainer}>
          {cartItems.length === 0 ? (
            <p style={{ padding: "20px" }}>No products in cart.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={style.cartItem}>
                <img
                  className={style.itemImage}
                  src={item.image}
                  alt={item.title}
                />
                <div className={style.itemDetails}>
                  <h3>{item.title}</h3>
                  <p>
                    <span>Category: </span>{item.category}
                  </p>
                  <h6 className={style.itemPrice}>${item.price}</h6>
                </div>
                <div className={style.quantityControl}>
                  <div className={style.itemAmount}>
                    <input
                      type="number"
                      min="1"
                      value="1"
                      name="number_of_item"
                      readOnly
                    />
                  </div>
                  <div
                    className={style.deleteIcon}
                    onClick={() => removeFromCart(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="/src/assets/delete.png" alt="delete" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Left Section - Order Summary */}
        <div className={style.orderSummaryRight}>
          <h2>Order Summary</h2>
          <div className={style.summaryItem}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={style.summaryItem}>
            <span>Discount (-20%)</span>
            <span className={style.discount}>-${discount.toFixed(2)}</span>
          </div>
          <div className={style.summaryItem}>
            <span>Delivery Fee</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <div className={style.summaryItem}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className={style.promo}>
            <input type="text" placeholder="🎁  Add promo code" />
            <button type="button">Apply</button>
          </div>
          <a href="#" className={style.checkoutButton}>
            Go to Checkout →
          </a>
        </div>
      </div>
    </div>
  );
}
