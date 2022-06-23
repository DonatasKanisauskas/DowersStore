import { useParams } from 'react-router-dom';
import '../styles/Products.sass';
import { productType } from './Product';
import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import PopUp from './PopUp';

function ProductView() {
  let { id } = useParams();
  const [product, setProduct] = useState<productType>();
  const [open, setOpen] = useState(false);

  const fetchPost = async () => {
    const response = await fetch(
      "https://dummyjson.com/products/" + id
    );
    const actualData = await response.json();
    setProduct(actualData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const togglePopup = () => {
    setOpen(!open);
  }

  return (
    <>
      {open && product &&
        <PopUp togglePopup={togglePopup} >
          <img src={product.thumbnail || logo} alt='Logo' />
        </PopUp>
      }
      {id && product &&
        <>

          <div className="product_image">
            <img onClick={togglePopup} src={product.thumbnail || logo} alt='Logo' />
          </div>
          <div className='product_container'>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
          <button className='product_button'>add to cart</button>
        </>
      }
    </>
  );
}

export default ProductView;