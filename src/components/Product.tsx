import logo from '../logo.svg';
import '../styles/Products.sass';


function Product() {
  return (
    <div className='product_card'>
      <div className='product_image'>
        <img src={logo} alt="Logo" />
      </div>
      <div className="product_container">
        <h4><b>Dvaro suris</b></h4>
        <p>Fermentinis suris</p>
      </div>
    </div>
  );
}

export default Product;