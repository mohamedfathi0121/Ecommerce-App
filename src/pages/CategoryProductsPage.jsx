import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/HomepageComponent/ProductCard";
import LoadingSpinner from "../spinner/LoadingSpinner";
import axios from "axios";

export default function CategoryProductsPage() {
  const { id } = useParams(); // 👈 ناخد الـ category id من الرابط
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://e-commerce-pearl-omega.vercel.app/api/v1/category/${id}`)
      .then(res => {
        setCategoryData(res.data.category);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching category:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!categoryData)
    return <p className="text-center mt-4">Category not found.</p>;

  const products = categoryData.products || [];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {categoryData.name} Category Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center">No products found in this category.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            padding: "0 20px",
          }}
        >
          {products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: "none" }}>
              
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                category={categoryData.name}
                price={product.price}
                oldPrice={null}
                image={product.image || categoryData.image}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
