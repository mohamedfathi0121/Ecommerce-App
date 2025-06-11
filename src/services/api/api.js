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
    return response.data.finlProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    const data = response.data;

    if (data.finlProducts) {
      const product = data.finlProducts.find(p => p._id === id);
      if (product) return product;
    }

    if (data.product) return data.product;

    throw new Error("Product not found");
  } catch (error) {
     console.log(error);
    throw new Error("Product loading failed");
  }
};

export const fetchRelatedProducts = async (currentId, limit = 4) => {
  try {
    const response = await api.get('/product');
    const data = response.data;

    let allProducts = [];

    if (data.finlProducts) {
      allProducts = data.finlProducts;
    } else if (Array.isArray(data)) {
      allProducts = data;
    }

    return allProducts.filter(p => p._id !== currentId).slice(0, limit);
  } catch (error) {
    console.log(error);
    
    throw new Error("Failed to load suggested products");
  }
};

























































export const searchProducts = async (query) => {
  try {
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid search query');
    }

    // Use query parameter (?searchKey=) instead of path parameter (/search/m)
    const response = await api.get(`/product/search`, {
      params: { searchKey: query.trim() } // Axios automatically encodes the query
    });
    
    // if (!response.data?.finlProducts) {
    //   throw new Error('No products found or invalid response structure');
    // }

    return response.data.product || []; // Return an empty array if no products found
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};