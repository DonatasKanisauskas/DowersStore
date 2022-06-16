import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/App.sass';
import '../styles/Layout.sass';
import Products from './Products';
import Header from './Header';
import Footer from './Footer';
import Cart from "./Cart";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="content_box">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
