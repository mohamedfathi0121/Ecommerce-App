import React, { PureComponent } from "react";
import style from "./CartPage.module.css";

export class CartPage extends PureComponent {
  render() {
    return (
      <div class={style.container}>
        <h1 className={style.cartTitle}>Your Cart</h1>
        <div className={style.cartDiv}>
          {/* Right Section Cart-Items */}
          <div className={style.cartContainer}>
            {/* item 1 */}
            <div className={style.cartItem}>
              <img
                className={style.itemImage}
                src="/src/assets/jacket.png"
                alt="Gradient Graphic T-shirt"
              />
              <div className={style.itemDetails}>
                <h3>Gradient Graphic T-shirt</h3>
                <p>
                  <span>Size: </span>Large
                </p>
                <p>
                  <span>Color: </span>Yellow
                </p>
                <h6 className={style.itemPrice}>$145</h6>
              </div>
              <div className={style.quantityControl}>
                <div className={style.itemAmount}>
                  <input
                    type="number"
                    min="1"
                    value="1"
                    name="number_of_item"
                  />
                </div>
                <div className={style.deleteIcon}>
                  <img src="/src/assets/delete.png" alt="delete" />
                </div>
              </div>
            </div>
          </div>

          {/* Left Section order-summary */}
          <div className={style.orderSummaryRight}>
            <h2>Order Summary</h2>
            <div className={style.summaryItem}>
              <span>Subtotal</span>
              <span>$565</span>
            </div>
            <div className={style.summaryItem}>
              <span>Discount (-20%)</span>
              <span className={style.discount}>-$113</span>
            </div>
            <div className={style.summaryItem}>
              <span>Delivery Fee</span>
              <span>$15</span>
            </div>
            <div className={style.summaryItem} {...style.total}>
              <span>Total</span>
              <span>$467</span>
            </div>

            <div className={style.promo}>
              <input type="text" placeholder="&#127873;  Add promo code" />
              <button type="button">Apply</button>
            </div>
            <a href="#" className={style.checkoutButton}>
              Go to Checkout &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
