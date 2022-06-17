import logo from '../logo.svg';
import '../styles/Products.sass';

export type productType = {
  title: string,
  price: number,
  desc: string
};


function Product({ title, price, desc }: productType) {
  return (
    <div className='product_card'>
      <div className='product_image'>
        <img src={logo} alt='Logo' />
      </div>
      <div className='product_container'>
        <h4 className='product_title'>{title}</h4>
        <p className='product_description'>{desc}</p>
        <p className='product_price'>${price}</p>
      </div>
      <button className='product_button'>add to cart</button>
    </div>
  );
}

export default Product;