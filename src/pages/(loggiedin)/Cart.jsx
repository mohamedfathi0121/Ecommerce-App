import React from "react";
import CartPage from "../../components/CartComponent/CartPage";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const Cart = () => {
  useDocumentTitle("Cart");

  return (
    <>
      <CartPage />
    </>
  );
};

export default Cart;