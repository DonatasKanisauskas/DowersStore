import { useNavigate, useParams } from "react-router-dom";
import { productType } from "../types/ProductType";
import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import Carousel from "../components/Carousel";
import Button from "../components/Button";
import HeartOutline from "../assets/HeartOutline";
import { useToast } from "../components/ToastContext";

export default function ProductDetails() {
  const { createToast } = useToast();
  const { id } = useParams();
  const [product, setProduct] = useState<productType>();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  const addToCart = async (id: number, quantity: number) => {
    try {
      await fetch(
        `https://webstorejs.azurewebsites.net/api/cart/${1}/addProduct?productId=${id}&quantity=${quantity}`
      );
      createToast("success", "Product added to cart");
    } catch (err) {
      console.error("error", `${err instanceof Error ? err.message : err}`);
    }
  };

  const updateQuantity = (stock: number, quantity: number) => {
    const updatedQuantity = quantity > stock ? stock : Math.max(quantity, 1);

    setQuantity(updatedQuantity);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://webstorejs.azurewebsites.net/api/products/${id}`
        );
        const data = await response.json();
        if (data.message) {
          navigate("/", { state: data.message });
        } else {
          setProduct(data);
        }
      } catch (err) {
        const ErrorMsg = err instanceof Error ? err.message : err;
        navigate("/", { state: ErrorMsg });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  return (
    <>
      {loading && <>Loading data...</>}
      {id && product && (
        <div className="flex flex-wrap 2xl:mx-40">
          {/* LEFT / TOP */}
          <Carousel
            images={[product.thumbnail, ...(product.images || [])]}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            className="w-full lg:w-7/12"
          />

          {/* RIGHT / BOTTOM */}
          <div className="w-full flex flex-col justify-between lg:w-5/12 p-5 bg-gray-100 rounded-md">
            {/* TOP */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center flex-wrap justify-between my-5">
                <h1 className="font-extrabold text-xl">{product.title}</h1>
                <p className="pr-5">{product.brand}</p>
              </div>
              <p className="font-bold text-lg">${product.price}</p>
              <p className="hidden">-{product.discountPercentage}%</p>
              <p className="py-2">{product.description}</p>

              <div className="flex gap-1">
                <p className="font-semibold">stock :</p>
                <p>{product.stock}</p>
              </div>

              <div className="flex gap-1">
                <p className="font-semibold">quantity :</p>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  id={`quantity-${product.id}`}
                  onChange={(e) =>
                    updateQuantity(product.stock, parseInt(e.target.value))
                  }
                />
              </div>

              <div className="flex my-1">
                <StarRating rating={product.rating} />
                <span className="ml-2">({product.rating})</span>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="flex gap-3 mt-10">
              <Button
                className="w-full"
                onClick={() => addToCart(product.id, quantity)}
                value="Add to cart"
              />
              <Button
                className="h-full bg-transparent border border-gray-400 hover:bg-gray-200"
                onClick={() => console.log("liked")}
              >
                <HeartOutline className=" text-black" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
