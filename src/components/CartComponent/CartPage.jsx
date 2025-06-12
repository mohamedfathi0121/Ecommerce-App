import React, { useEffect, useState } from "react";
import style from "./CartPage.module.css";
import { verifyToken } from "../../services/api/auth";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import Spinner from "../shared/Spinner";

const API_URL = "https://e-commerce-pearl-omega.vercel.app/api/v1/cart";
const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Hamada__${getToken()}`,
});

const fetchCartAPI = async () => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return res.data.cart || [];
};

const removeFromCartAPI = async productId => {
  await axios.patch(
    `${API_URL}/remove`,
    { productId },
    { headers: getAuthHeaders() }
  );
};

const updateQuantityAPI = async (productId, quantity) => {
  if (quantity <= 0) {
    return removeFromCartAPI(productId);
  }
  await axios.patch(
    `${API_URL}/update`,
    { productId, quantity },
    { headers: getAuthHeaders() }
  );
};

const clearCartAPI = async () => {
  await axios.patch(`${API_URL}/clear`, {}, { headers: getAuthHeaders() });
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const checkLoginAndLoadCart = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error("No token found");

        const user = await verifyToken(token);
        setUser(user);

        const items = await fetchCartAPI();
        setCart(items);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginAndLoadCart();
  }, []);

  // const handleUpdateQuantity = async (productId, quantity) => {
  //   await updateQuantityAPI(productId, quantity);
  //   const items = await fetchCartAPI();
  //   setCart(items);
  // };

  const handleClearCart = async () => {
    await clearCartAPI();
    const items = await fetchCartAPI();
    setCart(items);
    window.location.href = "/products";
  };

  if (loading) {
    return <Spinner />;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const delivery = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  return (
    <div className={style.container}>
      <h1 className={style.cartTitle}>Your Cart</h1>
      <div className={style.cartDiv}>
        {/* Left Section Cart Items */}
        <div className={style.cartContainer}>
          {cartItems.length === 0 ? (
            <p style={{ padding: "20px" }}>No products in cart.</p>
          ) : (
            cartItems.map(item => (
              <div className={style.cartItem} key={item.id}>
                <div className={style.cartItemLeft}>
                  <img
                  className={style.itemImage}
                  src={item.image}
                  alt={item.title}
                />
                <div className={style.itemDetails}>
                  <h3>{item.title}</h3>
                  <h6>This is : {item.title}</h6>
                  <h6 className={style.itemPrice}>${item.price}</h6>
                </div>
                </div>

                <div className={style.quantityControl}>
                  <div
                    onClick={() => increaseQuantity(item.id)}
                    className={style.qtyBTN}
                  >
                    <img src="/src/assets/plus.png" alt="delete" />
                  </div>
                  <input type="number" min={1} value={item.quantity} />
                  <div
                    onClick={() => decreaseQuantity(item.id)}
                    className={style.qtyBTN}
                  >
                    <img src="/src/assets/minus.png" alt="delete" />
                  </div>
                  <div
                    className={style.deleteIcon}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src="/src/assets/delete.png" alt="delete" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section Order Summary*/}
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
            <span>${delivery}</span>
          </div>
          <div className={style.summaryItem}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={style.promo}>
            <input type="text" placeholder="🎁 Add promo code" />
            <button type="button">Apply</button>
          </div>

          <button className={style.checkoutButton} onClick={handleClearCart}>
            Go to Checkout →
          </button>
          <button className={style.checkoutButton} onClick={() => clearCart()}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
