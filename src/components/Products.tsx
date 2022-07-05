import '../assets/styles/Products.sass';
import Product, { productType } from './Product';
import { useState, useEffect } from "react";


function Products() {
  const [productList, setProductList] = useState<productType>();

  const fetchProducts = async () => {
    const response = await fetch(
      "https://dummyjson.com/products"
    );
    const data = await response.json();
    setProductList(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div className="products_container">
        {productList instanceof Array &&
          productList.map(product => (
            <Product {...product} key={product.id} />
          ))
        }
      </div>
    </>
  );
}

export default Products;
