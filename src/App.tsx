import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <div className="container flex flex-col gap-10 mx-auto px-1 sm:px-4">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/:categoryid/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Products />} />
            <Route path="*" element={<Products />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
