import './ProductCard.css';

export default function ProductCard({ title, category, oldPrice, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <h4 className="product-title">{title}</h4>
      <p>{category}</p>
      <div className="product-prices">
        <span className="current-price">${price}</span>
        {oldPrice && <span className="old-price">${oldPrice}</span>}
      </div>
    </div>
  );
}
