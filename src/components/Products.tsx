import Product, { productType } from "./Product";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PopUp from "./PopUp";

export default function Products() {
  const { category } = useParams();
  const { state } = useLocation();
  const [products, setProducts] = useState<productType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const closePopup = () => {
    window.history.replaceState({}, document.title);
    setError(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products${
            category ? "/category/" + category : ""
          }`
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setError(state);
  }, [category, state]);

  return (
    <>
      <h1>Products</h1>
      {error && <PopUp closePopup={closePopup} error={error} />}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {loading && <>Loading data...</>}
        {products instanceof Array &&
          products.map((product) => <Product {...product} key={product.id} />)}
      </div>
    </>
  );
}
