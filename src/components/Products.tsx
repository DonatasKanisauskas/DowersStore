import '../assets/styles/Products.sass';
import Product, { productType } from './Product';
import { useState, useEffect } from "react";


function Products() {
  const [products, setProducts] = useState<productType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products`
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      {loading &&
        <>Loading data...</>
      }
      {error &&
        <>{error}</>
      }
      <div className="products_container">
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
