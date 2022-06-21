import '../styles/Products.sass';
import Product, { productType } from './Product';
import { useState, useEffect } from "react";


function Products() {
  const [data, setData] = useState<productType>();

  const fetchPost = async () => {
    const response = await fetch(
      "https://dummyjson.com/products"
    );
    const actualData = await response.json();
    setData(actualData.products);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div className="products_container">
        {data && data instanceof Array && 
          data.map(props => (
            <Product {...props} key={props.id} />
          ))}
      </div>
    </>
  );
}

export default Products;
