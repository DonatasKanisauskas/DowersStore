import { useParams } from 'react-router-dom';
import '../styles/Products.sass';
import { productType } from './Product';
import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import PopUp from './PopUp';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState<productType>();
  const [open, setOpen] = useState(false);
  let [selectedImage, setSelectedImage] = useState<string>();

  const fetchProduct = async () => {
    const response = await fetch(
      "https://dummyjson.com/products/"+id
    );
    const data = await response.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const togglePopup = () => {
    setOpen(!open);
  }

  const changeImage = (imageID: number) => {
    setSelectedImage(product?.images[imageID]);
  }

  return (
    <>
      {open && product &&
        <PopUp togglePopup={togglePopup} >
          <img src={selectedImage || product.thumbnail || logo} alt='Logo' />
        </PopUp>
      }
      {id && product &&
        <div className='productPreview_container'>
          <div className="productPreview_image">
            {/* <img className='productPreview_image_zoomin' src={selectedImage || product.thumbnail || logo} alt='' /> */}
            <div className='productPreview_image_contain'>
              <img className='productPreview_image_thumbnail' onClick={togglePopup} src={selectedImage || product.thumbnail || logo} alt='Logo' />
            </div>
            <div className='productPreview_image_list'>
              {
                product.images.map((image, i) => (
                  <img onClick={() => changeImage(i)} src={image} alt='img' key={i}  />
                ))
              }
            </div>
          </div>
          <div className='productPreview_content'>
            <h3 className='productPreview_title'>{product.title}</h3>
            <p className='productPreview_description'>{product.description}</p>
            <p>${product.price}</p>
            <button className='product_button'>add to cart</button>
          </div>
        </div>
      }
    </>
  );
}

export default ProductView;
