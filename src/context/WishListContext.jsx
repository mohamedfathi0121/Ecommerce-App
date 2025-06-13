import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://e-commerce-pearl-omega.vercel.app/api/v1/user/getWishlist",
        {
          headers: {
            Authorization: `Hamada__${token}`,
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      if (data.message === "Done") {
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlistItem = async productId => {
    if (!token || loading) return;

    setLoading(true);
    try {
      const currentlyInWishlist = wishlist.some(item => item._id === productId);
      const endpoint = currentlyInWishlist
        ? `https://e-commerce-pearl-omega.vercel.app/api/v1/product/${productId}/wishlist/remove`
        : `https://e-commerce-pearl-omega.vercel.app/api/v1/product/${productId}/wishlist/add`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Hamada__${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      if (data.message === "Done") {
        await fetchWishlist();
        toast.success(
          currentlyInWishlist ? "Removed from wishlist" : "Added to wishlist"
        );
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
      toast.error(error.message || "Failed to update wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    if (isAuthenticated && token) {
      fetchWishlist();
    }
  }, [isAuthenticated, token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        toggleWishlistItem,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
