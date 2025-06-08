import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/Product-Details/product-details';
// import ProductCard from'./pages/HomepageComponent/ProductCard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '20px' }}>
            <h1>Welcome to E-Commerce App</h1>
            <p>Try visiting /products/1 to see product details</p>
          </div>
        } />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;