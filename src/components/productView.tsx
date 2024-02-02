import { useNavigate, useParams } from "react-router-dom";
import { productType } from "./Product";
import React, { useEffect, useState } from "react";
import logo from "/logo.svg";
import Star from "../assets/Star";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState<productType>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        if (data.message) {
          navigate("/", { state: data.message });
        } else {
          setProduct(data);
        }
      } catch (err: any) {
        navigate("/", { state: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const changeImage = (imageID: number) => {
    setSelectedImage(product?.images[imageID]);
  };

  const zoomImage = (e: React.MouseEvent<HTMLElement>) => {
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / image.offsetWidth) * 100;
    const y = ((e.clientY - rect.top) / image.offsetHeight) * 100;
    image.style.backgroundPosition = x + "% " + y + "%";
  };

  return (
    <>
      {loading && <>Loading data...</>}
      {id && product && (
        <div>
          <div>
            <div>
              <figure
                onMouseMove={(e) => zoomImage(e)}
                style={{
                  backgroundImage: `url(${
                    selectedImage || product.thumbnail || logo
                  })`,
                }}
              >
                <img
                  src={selectedImage || product.thumbnail || logo}
                  alt="Logo"
                />
              </figure>
            </div>
            <div>
              {product.images.map((image, i) => (
                <img
                  onClick={() => changeImage(i)}
                  src={image}
                  alt="img"
                  key={i}
                />
              ))}
            </div>
          </div>
          <div>
            <p>{product.brand}</p>
            <h3>{product.title}</h3>
            <div>
              {[...Array(5)].map((e, i) => (
                <Star
                  fill={Math.round(product.rating) > i ? "gold" : "lightgray"}
                />
              ))}
              <span>({product.rating})</span>
            </div>
            <p>{product.description}</p>
            <p>stock: {product.stock}</p>
            <div className="m-t-auto">
              <p>
                ${product.price} <span>-{product.discountPercentage}%</span>
              </p>
              <button>add to cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
