import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Cart from "./pages/(loggiedin)/Cart";
import Spinner from "./components/Spinner";
import ProductDetails from "./pages/product-details";
import AboutUs from "./pages/AboutUs";


function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart/>} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="about" element={<AboutUs />} />
          <Route path="spinner" element={<Spinner />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
