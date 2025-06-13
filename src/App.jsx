import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/product-details";
import AboutUs from "./pages/AboutUs";
import { AuthProvider } from "./context/authContext";
import Layout from "./components/shared/Layout";
import Spinner from "./components/shared/Spinner";
import { Toaster } from "react-hot-toast";
import Search from "./pages/search";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { CartProvider } from "./context/CartContext";
import { HelmetProvider } from 'react-helmet-async';

// auth imports
import LoginLayout from "./components/shared/LoginLayout";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import ResetPassword from "./pages/auth/ForgetPassword";
import SendCode from "./pages/auth/SendCode";
import Wishlist from "./pages/(loggiedin)/Wishlist";
import Profile from "./pages/(loggiedin)/Profile";
import Cart from "./pages/(loggiedin)/Cart";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import { WishlistProvider } from "./context/WishListContext";
import Contact from "./pages/Contact";



function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
          <HelmetProvider>
          <Routes>
            {/* Auth routes with LoginLayout */}
            <Route path="/" element={<LoginLayout />}>
              <Route path="login" element={<SignInForm />} />
              <Route path="register" element={<SignUpForm />} />
              <Route path="forgetpassword" element={<ResetPassword />} />
              <Route path="sendcode" element={<SendCode />} />
            </Route>

            {/* Main routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="spinner" element={<Spinner />} />
              <Route path="search" element={<Search />} />
              <Route path="contact" element=<Contact /> />
              <Route path="/category/:id" element={<CategoryProductsPage />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="profile" element={<Profile />} />
                <Route path="cart" element={<Cart />} />
              </Route>
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </HelmetProvider>
        </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </>
  );
}

export default App;
