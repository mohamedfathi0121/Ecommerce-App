// Home.jsx
import { useEffect, useState } from "react";
import SectionTitle from "../components/HomepageComponent/SectionTitle";
import ProductCard from "../components/HomepageComponent/ProductCard";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { fetchAllCategories } from "../services/categoryService";
import { Banner } from "../components/herocomponent/banner";
import { Link } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCategories()
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Invalid data format:", data);
          setLoading(false);
          return;
        }

        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Banner />
      {categories.map((category) => {
        const products = Array.isArray(category.products) ? category.products : [];

        return (
          <div key={category._id} style={{ marginBottom: "40px" }}>
            <SectionTitle>
              {category.name.charAt(0).toUpperCase() +
                category.name.slice(1).toLowerCase()}{" "}
              Department
            </SectionTitle>

            {products.length === 0 ? (
              <p style={{ textAlign: "center", fontStyle: "italic" }}>
                No products in this category yet.
              </p>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    padding: "0 20px",
                  }}
                >
                  {products.slice(0, 5).map((product) => (
                    <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: "none" }}>  <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.name}
                      category={category.name}
                      price={product.price}
                      oldPrice={null}
                      image={product.image || category.image}
                    /></Link>
               
                    
                  ))}
                </div>

                {products.length > 5 && (
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Link to={`/category/${category._id}`}>
                      <button
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
                        View All Products
                      </button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
