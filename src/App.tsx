import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="flex flex-col gap-10">
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <div className="container flex flex-col gap-10 mx-auto px-4">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/:category/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
