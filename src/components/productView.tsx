import logo from '../logo.svg';
import '../styles/Products.sass';
import { productType } from './Product';

function ProductView(product : productType) {
  return (
    <>
      <div>
        <img src={product.thumbnail || logo} alt='Logo' />
      </div>
      <div className='product_container'>
        <h4>{product.title}</h4>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
      <button className='product_button'>add to cart</button>
    </>
  );
}

export default ProductView;