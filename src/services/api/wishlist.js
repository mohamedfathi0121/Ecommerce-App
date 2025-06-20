import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "https://e-commerce-pearl-omega.vercel.app/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      const errorMessage = error.response.data?.message || "Request failed";
      toast.error(errorMessage);
      return Promise.reject({
        message: errorMessage,
        fieldErrors: error.response.data?.errors,
      });
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("No response from server");
      return Promise.reject({ message: "No response from server" });
    } else {
      // Something happened in setting up the request
      toast.error("Request setup error");
      return Promise.reject({ message: error.message });
    }
  }
);

export const addToWishlist = async (productId) => {
    try {
    const response = await api.patch(`/product/${productId}/wishlist/add`);
    return response;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }

};