import { useEffect, useState } from "react";

import SectionTitle from "../components/HomepageComponent/SectionTitle";
import ProductCard from "../components/HomepageComponent/ProductCard";

import LoadingSpinner from "../spinner/LoadingSpinner";
import { fetchAllProducts } from "../services/productService";
import {Banner} from "../components/herocomponent/banner";

import { Link } from "react-router-dom";


function Home() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true); // ✅ لازم نتحكم فيها

  useEffect(() => {
=
  fetchAllProducts()
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        setLoading(false);
        return;
      }

      const grouped = {};
      data.forEach((product) => {
        const category = product.categoryId?.name || "Unknown";
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(product);
      });

      setProductsByCategory(grouped);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      setLoading(false);
    });
}, []);


  const handleShowMore = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
       <Banner />

       
      {Object.entries(productsByCategory).map(([category, items]) => {
        const visibleItems = expandedCategories[category]
          ? items
          : items.slice(0, 10);

        return (
          <div key={category} style={{ marginBottom: "40px" }}>
            <SectionTitle>
              {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() + ' Department'}
            </SectionTitle>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                padding: "0 20px",
              }}
            >
              {visibleItems.map((product) => (



             <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}> 
                 <ProductCard
                  key={product._id} // ✅ غالبًا ال ID اسمه كده
                  title={product.name}
                  category={product.categoryId?.name}
                  price={product.finalPrice}
                  oldPrice={product.price}
                  image={product.images?.[0]}

                />
             </Link>

              ))}
            </div>

            {items.length > 6 && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                  onClick={() => handleShowMore(category)}
                  style={{
                    padding: "8px 5vw",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#1e90ff",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    marginTop: "5vh",
                  }}
                >
                  {expandedCategories[category] ? "Less" : "More"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
