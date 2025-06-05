import React, { PureComponent } from "react";
import "./CartPage.css";

export class CartPage extends PureComponent {
  render() {
    return (
      <div class="container">
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart_div">
          {/* Right Section Cart-Items */}
          <div className="cart-container">
            {/* item 1 */}
            <div className="cart-item">
              <img
                className="item-image"
                src="/src/assets/jacket.png"
                alt="Gradient Graphic T-shirt"
              />
              <div className="item-details">
                <h3>Gradient Graphic T-shirt</h3>
                <p>
                  <span>Size: </span>Large
                </p>
                <p>
                  <span>Color: </span>Yellow
                </p>
                <h6 className="item-price">$145</h6>
              </div>
              <div className="quantity-control">
                <div className="item-amount">
                  <input
                    type="number"
                    min="1"
                    value="1"
                    name="number_of_item"
                  />
                </div>
                <div className="delete-icon">
                  <img src="/src/assets/delete.png" alt="delete" />
                </div>
              </div>
            </div>
            {/* item 2 */}
            <div className="cart-item">
              <img
                className="item-image"
                src="/src/assets/jacket.png"
                alt="Gradient Graphic T-shirt"
              />
              <div className="item-details">
                <h3>Gradient Graphic T-shirt</h3>
                <p>
                  <span>Size: </span>Large
                </p>
                <p>
                  <span>Color: </span>Yellow
                </p>
                <h6 className="item-price">$145</h6>
              </div>
              <div className="quantity-control">
                <div className="item-amount">
                  <input
                    type="number"
                    min="1"
                    value="1"
                    name="number_of_item"
                  />
                </div>
                <div className="delete-icon">
                  <img src="/src/assets/delete.png" alt="delete" />
                </div>
              </div>
            </div>
            {/* item 3 */}
            <div className="cart-item">
              <img
                className="item-image"
                src="/src/assets/jacket.png"
                alt="Gradient Graphic T-shirt"
              />
              <div className="item-details">
                <h3>Gradient Graphic T-shirt</h3>
                <p>
                  <span>Size: </span>Large
                </p>
                <p>
                  <span>Color: </span>Yellow
                </p>
                <h6 className="item-price">$145</h6>
              </div>
              <div className="quantity-control">
                <div className="item-amount">
                  <input
                    type="number"
                    min="1"
                    value="1"
                    name="number_of_item"
                  />
                </div>
                <div className="delete-icon">
                  <img src="/src/assets/delete.png" alt="delete" />
                </div>
              </div>
            </div>
          </div>

          {/* Left Section order-summary */}
          <div className="order-summary_right">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>$565</span>
            </div>
            <div className="summary-item">
              <span>Discount (-20%)</span>
              <span className="discount">-$113</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee</span>
              <span>$15</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>$467</span>
            </div>

            <div className="promo">
              <input type="text" placeholder="&#127873;  Add promo code" />
              <button type="button">Apply</button>
            </div>
            <a href="#" className="checkout-button">
              Go to Checkout &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
