import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/(loggiedin)/Cart";
import ProductDetails from "./pages/product-details";
import AboutUs from "./pages/AboutUs";
import { AuthProvider } from "./context/authContext";
import SignUpForm from "./pages/sup";
import SignInForm from "./pages/sin";
import Layout from "./components/shared/Layout";
import Spinner from "./components/shared/Spinner";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import Search from "./pages/search";
import Wishlist from "./pages/Wishlist";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="login" element={<SignInForm />} />
            <Route path="register" element={<SignUpForm />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="/" element={<ProtectedRoutes />}>
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="profile" element={<Profile />} />
                <Route path="cart" element={<Cart />} />
              </Route>

              <Route path="about" element={<AboutUs />} />
              <Route path="spinner" element={<Spinner />} />
              <Route path="search" element={<Search />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
