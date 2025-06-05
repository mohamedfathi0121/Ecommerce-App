import { useEffect, useState } from "react";
import axios from "axios";
import SectionTitle from "./HomepageComponent/SectionTitle";
import ProductCard from "./HomepageComponent/ProductCard";

function Home() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        const data = res.data;

        const grouped = {};
        data.forEach((product) => {
          const category = product.category.name;
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(product);
        });

        setProductsByCategory(grouped);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleShowMore = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      {Object.entries(productsByCategory).map(([category, items]) => {
        const visibleItems = expandedCategories[category]
          ? items
          : items.slice(0, 10);

        return (
          <div key={category} style={{ marginBottom: "40px" }}>
            <SectionTitle>{category.toUpperCase()} DEPARTMENT</SectionTitle>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                padding: "0 20px",
              }}
            >
              {visibleItems.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  category={product.category.name}
                  price={product.price}
                  oldPrice={product.price + 10}
                  image={product.images[0]}
                />
              ))}
            </div>

            {items.length > 6 && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                  onClick={() => handleShowMore(category)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#1e90ff",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  {expandedCategories[category] ? "عرض أقل" : "عرض المزيد"}
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
