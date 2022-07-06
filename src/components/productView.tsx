import { useParams } from 'react-router-dom';
import '../assets/styles/ProductView.sass';
import { productType } from './Product';
import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState<productType>();
  let [selectedImage, setSelectedImage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${id}`
      );
      const data = await response.json();
      if (data.message) {
        setError(data.message)
      }
      else {
        setProduct(data);
      }
    }
    catch (err: any) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const changeImage = (imageID: number) => {
    setSelectedImage(product?.images[imageID]);
  }

  const zoomImage = (e: React.MouseEvent<HTMLElement>) => {
    let image = e.currentTarget;
    let rect = image.getBoundingClientRect();
    let x = (e.clientX - rect.left) / image.offsetWidth * 100;
    let y = (e.clientY - rect.top) / image.offsetHeight * 100;
    image.style.backgroundPosition = x + '% ' + y + '%';
  }

  return (
    <>
      {loading &&
        <>Loading data...</>
      }
      {error &&
        <>{error}</>
      }
      {id && product &&
        <div className='productPreview_container'>
          <div className="productPreview_image">
            <div className='productPreview_image_contain'>
              <figure
                className="productPreview_image_thumbnail"
                onMouseMove={e => zoomImage(e)}
                style={{ backgroundImage: `url(${selectedImage || product.thumbnail || logo})` }}
              >
                <img
                  src={selectedImage || product.thumbnail || logo}
                  alt='Logo'
                />
              </figure>
            </div>
            <div className='productPreview_image_list'>
              {
                product.images.map((image, i) => (
                  <img onClick={() => changeImage(i)} src={image} alt='img' key={i} />
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
