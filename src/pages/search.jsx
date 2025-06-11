import { useEffect } from "react";
import { useState } from "react";
import { searchProducts } from "../services/api/api";
import Spinner from "../components/shared/Spinner";
// import { useLocation } from "react-router-dom";
import ProductCard from "../components/HomepageComponent/ProductCard";
import { Link, useLocation } from "react-router-dom";

function Search() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchProducts(query);
        setSearchResults(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    console.log("query", query);
    fetchData();
  }, [query]);
  if (searchProducts) {
    console.log("searchhhhhh", searchResults);
  }
  return (
    <div>
      <h1>Search Page</h1>
      {loading && <Spinner />}
      {error && <p>{error}</p>}
      {searchResults.length === 0 ? (
        <p>No results found for "{query}"</p>
      ) : (
        <div className="products-grid"  style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 400px))",
                justifyContent: "center",
                
                gap: "20px",
                padding: "0 20px",
              }}>
          {searchResults.map(product => (
           
              <Link
                to={`/products/${product._id}`}
                style={{ textDecoration: "none" }}
                key={product._id}
              >
                <ProductCard
                  title={product.name}
                  category={product.categoryId?.name}
                  price={product.finalPrice}
                  oldPrice={product.price}
                  image={product.images?.[0]}
                />
              </Link>
            
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
