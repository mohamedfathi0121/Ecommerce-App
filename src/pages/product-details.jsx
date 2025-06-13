import React, { useEffect, useState } from "react";
import styles from "./styles/product-details.module.css";
import { fetchProductById, fetchRelatedProducts } from "../services/api/api";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiShare2 } from "react-icons/fi";
import Spinner from "../components/shared/Spinner";
import ProductCard from "../components/HomepageComponent/ProductCard";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";
import WishlistButton from "../components/ui/FavoriteBtn";
import { useAuth } from "../context/authContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { user } = useAuth();

  // Base URL for absolute image paths
  const baseUrl = "https://yourdomain.com"; // Replace with your actual domain

  // Helper function to get absolute image URLs
  const getAbsoluteImageUrl = relativePath => {
    if (!relativePath) return "";
    if (relativePath.startsWith("http")) return relativePath;
    return `${baseUrl}${relativePath}`;
  };

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

  const { addToCart } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

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

  const handleAddToCart = (e) => {
    if (!user) {
      e.stopPropagation();
      e.preventDefault();
      toast.error("Please login to add items to cart");
      return;
    } else {
      addToCart({
        id: product._id,
        title: product.name,
        category: product.categoryId?.name,
        price: product.finalPrice,
        oldPrice: product.price,
        image: product.images?.[0],
      });

      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  // Get share image URL with fallback
  const shareImage = product.images?.[0]
    ? getAbsoluteImageUrl(product.images[0])
    : `${baseUrl}/default-product-image.jpg`;

  return (
    <>
      <Helmet>
        {/* Basic meta tags */}
        <title>{`${product.name} | Shopco`}</title>
        <meta name="description" content={product.description} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={product.name} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Shopco" />
        <meta property="product:price:amount" content={product.finalPrice} />
        <meta property="product:price:currency" content="USD" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={shareImage} />
        <meta name="twitter:label1" content="Price" />
        <meta name="twitter:data1" content={`$${product.finalPrice}`} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.productContainer}>
          {/* Images */}
          <div className={styles.imageGallery}>
            <div className={styles.thumbnailsColumn}>
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={getAbsoluteImageUrl(img)}
                  alt={`Image ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    selectedImage === img ? styles.activeThumbnail : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className={styles.mainImageWrapper}>
              <img
                src={getAbsoluteImageUrl(selectedImage)}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
          </div>

          {/* Product Details */}
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
              <button className={styles.addToCartBtn} onClick={(e) => {handleAddToCart(e)}}>
                <FiShoppingCart /> Add to Cart
              </button>
              <button className={styles.buyNowBtn}>Buy Now</button>

              {/* Success message */}
              {showAddedMessage && (
                <div
                  style={{
                    color: "green",
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  ✅ Product added to cart!
                </div>
              )}
            </div>

            <div className={styles.socialActions}>
              <WishlistButton
                productId={product._id}
                title={"add to wishlist"}
              />

              <button className={styles.shareBtn} onClick={handleShare}>
                <FiShare2 /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Suggested products</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(product => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.name}
                category={product.categoryId?.name}
                price={product.finalPrice}
                oldPrice={product.price}
                image={getAbsoluteImageUrl(product.images?.[0])}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
