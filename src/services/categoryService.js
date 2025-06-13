// services/categoryService.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-pearl-omega.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllCategories = async () => {
  try {
    const response = await api.get("/category");
    return response.data.categoryList || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
