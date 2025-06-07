import React, { useState } from 'react';
import styles from './product-details.module.css';
import { FiHeart, FiShoppingCart, FiSearch, FiShare2 } from 'react-icons/fi';
// import ProductCard from '../HomepageComponent/ProductCard';
const ProductDetails = () => {
  const product = {
    title: ' T-Shirt',
    brand: 'Vintage Apparel',
    rating: 4.5,
    reviews: 120,
    priceBefore: 250,
    priceAfter: 200,
    discount: 20,
    available: true,
    images: [
      'https://m.media-amazon.com/images/I/51x6+9L0OzL._AC_SX569_.jpg',
      'https://m.media-amazon.com/images/I/51V189EzwNL._AC_SX569_.jpg',
      'https://m.media-amazon.com/images/I/41FR3hOQIYL._AC_SX569_.jpg',
    ],
    sizes: ['Small', 'Medium', 'Large', 'XLarge'],
    colors: ['#4A4C2A', '#C2B280', '#3F3D3D'],
    description: 'This graphic t-shirt is perfect for any occasion. Crafted with 100% cotton for maximum comfort.'
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

//   const recommendedProducts = [
//     { id: 1, name: 'Basic White Tee', price: 120, image: 'https://via.placeholder.com/300x300' },
//     { id: 2, name: 'Black Hoodie', price: 180, image: 'https://via.placeholder.com/300x300' },
//     { id: 3, name: 'Denim Jeans', price: 220, image: 'https://via.placeholder.com/300x300' },
//   ];

  return (
    <div className={styles.container}>
    
      

      <div className={styles.productContainer}>
   
        <div className={styles.imageGallery}>
          <div className={styles.thumbnailsColumn}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumbnail : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          
          <div className={styles.mainImageWrapper}>
            <img 
              src={selectedImage} 
              alt={product.title} 
              className={styles.mainImage}
            />
          </div>
        </div>

       
        <div className={styles.detailsSection}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.brandName}>{product.brand}</p>
          
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className={styles.reviews}>({product.reviews} reviews)</span>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${product.priceAfter}</span>
            <span className={styles.oldPrice}>${product.priceBefore}</span>
            <span className={styles.discount}>{product.discount}% OFF</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Color Selection */}
          <div className={styles.colorSelection}>
            <h3>Color:</h3>
            <div className={styles.colorOptions}>
              {product.colors.map((color, index) => (
                <div 
                  key={index}
                  className={`${styles.colorOption} ${selectedColor === color ? styles.selectedColor : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.sizeSelection}>
            <h3>Size:</h3>
            <div className={styles.sizeOptions}>
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`${styles.sizeOption} ${selectedSize === size ? styles.selectedSize : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

       
          <div className={styles.actionButtons}>
            <button className={styles.addToCartBtn}>
              <FiShoppingCart /> Add to Cart
            </button>
            <button className={styles.buyNowBtn}>Buy Now</button>
          </div>

         
          <div className={styles.socialActions}>
            <button className={styles.wishlistBtn}>
              <FiHeart /> Add to Wishlist
            </button>
            <button className={styles.shareBtn}>
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {/* <div className={styles.recommendedSection}>
        <h2>You May Also Like</h2>
        <ProductCard></ProductCard>
      </div> */}
    </div>
  );
};

export default ProductDetails;