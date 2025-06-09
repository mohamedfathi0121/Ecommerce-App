import axios from "axios";

const api = axios.create({
  baseURL: 'https://e-commerce-pearl-omega.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/product');
    console.log("Full response data:", response.data);

    // المفتاح الصح هو finlProducts
    const products = response.data.finlProducts;

    if (Array.isArray(products)) {
      return products;
    } else {
      console.warn("finlProducts is not an array:", products);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
