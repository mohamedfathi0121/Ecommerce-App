import ProductCard from "../../components/HomepageComponent/ProductCard";
import Spinner from "../../components/shared/Spinner";
import { useWishlist } from "../../context/WishListContext";
function Wishlist() {
  const { loading, wishlist } = useWishlist();
  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "20px" }}>Wishlist Page</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 400px))",
            justifyContent: "center",

            gap: "20px",
            padding: "0 20px",
            marginBottom: "40px",
            marginTop: "40px",
          }}
        >
          {wishlist.length > 0 ? (
            wishlist.map(item => (
              <div key={item._id} className="wishlist-item">
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  //   category={category.name}
                  price={item.price}
                  oldPrice={null}
                  image={item.image}
                />
              </div>
            ))
          ) : (
            <p>No items in wishlist</p>
          )}
        </div>
      )}
    </div>
  );
}
export default Wishlist;
