import React, { useEffect, useState } from "react";
import styles from "./styles/product-details.module.css";
import { fetchProductById, fetchRelatedProducts } from "../services/api/api";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiShare2 } from "react-icons/fi";
import Spinner from "../components/shared/Spinner";
import ProductCard from "../components/HomepageComponent/ProductCard";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Error sharing product");
      console.error("Error sharing:", error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
        setSelectedImage(productData.images?.[0] || "");
        setSelectedColor(productData.colors?.[0] || "");
        setSelectedSize(productData.size?.[0] || "");

        const suggestions = await fetchRelatedProducts(id);
        setRelatedProducts(suggestions);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.container}>
      <div className={styles.productContainer}>
        <div className={styles.imageGallery}>
          <div className={styles.thumbnailsColumn}>
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`صورة ${index + 1}`}
                className={`${styles.thumbnail} ${
                  selectedImage === img ? styles.activeThumbnail : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className={styles.mainImageWrapper}>
            <img
              src={selectedImage}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.brandName}>
            {product.brandId?.name || "Unbranded"}
          </p>

          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {"★".repeat(Math.floor(product.Rating || 0))}
              {"☆".repeat(5 - Math.floor(product.Rating || 0))}
            </div>
            <span className={styles.reviews}>
              ({product.review?.length || 0} review)
            </span>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>
              ${product.finalPrice?.toFixed(2)}
            </span>
            <span className={styles.oldPrice}>
              ${product.price?.toFixed(2)}
            </span>
            <span className={styles.discount}>
              {product.discount}% discount
            </span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.colorSelection}>
            <h3>Color:</h3>
            <div className={styles.colorOptions}>
              {product.colors?.map((color, index) => (
                <div
                  key={index}
                  className={`${styles.colorOption} ${
                    selectedColor === color ? styles.selectedColor : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.sizeSelection}>
            <h3>Size :</h3>
            <div className={styles.sizeOptions}>
              {product.size?.map((size, index) => (
                <button
                  key={index}
                  className={`${styles.sizeOption} ${
                    selectedSize === size ? styles.selectedSize : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.availability}>
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>

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
            <button className={styles.shareBtn} onClick={handleShare}>
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </div>
      <div className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>Suggested products</h2>
        <div className={styles.relatedGrid}>
          {relatedProducts.map(product => (
            <ProductCard
              key={product._id}
              title={product.name}
              category={product.categoryId?.name}
              price={product.finalPrice}
              oldPrice={product.price}
              image={product.images?.[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
