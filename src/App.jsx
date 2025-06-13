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



function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <CartProvider>
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
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
