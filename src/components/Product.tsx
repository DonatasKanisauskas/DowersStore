import logo from '../logo.svg';
import '../styles/Products.sass';

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

function Product(props : productType) {
  return (
    <div className='product_card'>
      <div className='product_image'>
        <img src={logo} alt='Logo' />
      </div>
      <div className='product_container'>
        <h4 className='product_title'>{props.title}</h4>
        <p className='product_description'>{props.description}</p>
        <p className='product_price'>${props.price}</p>
      </div>
      <button className='product_button'>add to cart</button>
    </div>
  );
}

export default Product;