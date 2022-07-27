import '../assets/styles/Products.sass';
import Product, { productType } from './Product';
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import PopUp from './PopUp';


function Products() {
  const { category } = useParams();
  const { state } = useLocation();
  const [products, setProducts] = useState<productType>();
  const [categories, setCategories] = useState<Array<String>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products${category ? "/category/" + category : ""}`
      );
      const data = await response.json();
      setProducts(data.products);
    }
    catch (err: any) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/categories`
      );
      const data = await response.json();
      setCategories(data);
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  const closePopup = () => {
    window.history.replaceState({}, document.title);
    setError(null);
  }

  useEffect(() => {
    console.log("test");
    fetchProducts();
    setError(state);
    fetchCategories();
  }, [category]);

  return (
    <>
      <h1>Products</h1>
      {error &&
        <PopUp closePopup={closePopup} error={error} />
      }
      <div className="categories flex wrap center">
        <h4 className='noShrink'>Categories</h4>
        <a href="/products">All</a>
        {categories instanceof Array &&
          categories.map((category, i) => (
            <Link key={i} to={"/" + category + "/products"}>{category}</Link>
          ))
        }
      </div>
      <div className="products_container">
        {loading &&
          <>Loading data...</>
        }
        {products instanceof Array &&
          products.map(product => (
            <Product {...product} key={product.id} />
          ))
        }
      </div>
    </>
  );
}

export default Products;
