import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  const addToCart = (product) => {
    const founded = cartItems.find((item) => item.id === product.id);

    let updatedCart;

    if (!founded) {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    } else {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      toast.success("Product already in cart, quantity increased");
    }

    setCartItems(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity >= 50 ? 50 : item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity <= 1 ? 1 : item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    toast.success("Item is deleted successfully");
  };

  const clearCart = () => {
    localStorage.removeItem("Cart");
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
