import { useState } from 'react';
import logo from '../logo.svg';
import PopUp from './PopUp';
import ProductView from './productView';

export interface productType {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: [string, string, string, string],
};


function Product(product: productType) {

  const [open, setOpen] = useState(false);

  const togglePopup = () => {
    setOpen(!open);
  }

  const addToCart = (product: productType) => {
    console.log("adding", product.title, "to cart");
    return
  }

  return (
    <>
      {open &&
        <PopUp togglePopup={togglePopup} >
          <ProductView {...product} />
        </PopUp>
      }
      <div className='product_card'>
        <div className="product_content" onClick={togglePopup}>
          <div className='product_image'>
            <img src={product.thumbnail || logo} alt='Logo' />
          </div>
          <div className='product_container'>
            <h4 className='product_title'>{product.title}</h4>
            <p className='product_description'>{product.description}</p>
            <p className='product_price'>${product.price}</p>
          </div>
        </div>
        <button className='product_button' onClick={() => addToCart(product)}>add to cart</button>
      </div>
    </>
  );
}

export default Product;