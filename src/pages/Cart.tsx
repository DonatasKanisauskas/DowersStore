import { useNavigate, useParams } from "react-router-dom";
import { cartProduct } from "../types/ProductType";
import { useEffect, useState } from "react";
import Star from "../assets/Star";
import Cross from "../assets/Cross";
import Button from "../components/Button";

export default function Cart() {
  // const { id } = useParams();
  const id = 1;
  const shipmentPrice = 20;
  const [products, setProducts] = useState<cartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const removeFromCart = (product: cartProduct) => {
    console.log(`removed, ${product.title}, from cart`);
  };

  const updateQuantity = (
    productId: number,
    total: number,
    quantity: number
  ) => {
    const updatedQuantity = quantity > 0 ? quantity : 1;

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity > total ? total : updatedQuantity,
    }));
  };

  // Fetch cart products
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/carts/${id}`);
        const data = await response.json();
        if (data.message) {
          navigate("/", { state: data.message });
        } else {
          setProducts(data.products);
          data.products.map((product: cartProduct) =>
            updateQuantity(product.id, product.total, product.quantity)
          );
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

  // Update total price whenever quantities change
  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * (quantities[product.id] || 0);
    });
    setTotalPrice(total);
  }, [products, quantities]);

  const formatPrice = (price: number) => {
    if (Number.isInteger(price)) {
      return price.toLocaleString();
    } else {
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };

  return (
    <div className="container flex flex-row flex-wrap lg:flex-nowrap gap-10">
      {loading && <>Loading data...</>}
      <div className="w-full grid grid-cols-1 divide-y">
        {products.length !== 0 &&
          products.map((product, i) => (
            <div key={i} className={`flex gap-3 py-2 px-5 h-40`}>
              {/* LEFT */}
              <div className="w-40 h-full flex items-center justify-center">
                {/* LEFT / TOP */}
                {product.thumbnail ? (
                  <img
                    className="max-h-full max-w-full"
                    src={product.thumbnail}
                    alt="product"
                  />
                ) : (
                  <Star />
                )}
              </div>

              {/* RIGHT */}
              <div className="w-full flex flex-col gap-1 py-2 justify-between">
                {/* TOP */}
                <div>
                  <div className="flex flex-row justify-between items-center">
                    <h6 className="font-medium overflow-hidden max-h-[24px] overflow-y-hidden">
                      {product.title}
                    </h6>
                    <button
                      className="group text-gray-700 h-full bg-transparent rounded-md"
                      onClick={() => removeFromCart(product)}
                    >
                      <Cross className="text-gray-400 group-hover:text-gray-500" />
                    </button>
                  </div>

                  <div className="flex gap-1">
                    <p>quantity :</p>
                    <input
                      type="number"
                      min="1"
                      max={product.total}
                      value={quantities[product.id]}
                      onChange={(e) =>
                        updateQuantity(
                          product.id,
                          product.total,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="flex flex-col md:flex-row items-end md:justify-between">
                  <div className="flex gap-1">
                    <p>product price : </p>
                    <p>${formatPrice(product.price)}</p>
                  </div>
                  <div className="flex gap-1">
                    <p>total : </p>
                    <p>
                      ${formatPrice(product.price * quantities[product.id])}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full lg:7/12 xl:w-6/12">
        <div className="flex flex-col gap-4 px-8 py-7 bg-gray-50 rounded-lg">
          <h1 className="font-semibold text-lg">Order summary</h1>
          <div className="grid grid-cols-1 divide-y">
            <div className="flex justify-between py-4">
              <label htmlFor="subtotal">Subtotal</label>
              <p id="subtotal" className="font-medium">
                ${formatPrice(totalPrice)}
              </p>
            </div>
            <div className="flex justify-between py-4">
              <label htmlFor="subtotal">Shipping estimate</label>
              <p id="subtotal" className="font-medium">
                ${formatPrice(shipmentPrice)}
              </p>
            </div>
            <div className="flex justify-between py-4">
              <label htmlFor="subtotal">Tax estimate</label>
              <p id="subtotal" className="font-medium">
                ${formatPrice(totalPrice * 0.15)}
              </p>
            </div>
            <div className="flex justify-between py-4">
              <label htmlFor="subtotal " className="font-medium">
                Order total
              </label>
              <p id="subtotal" className="font-medium">
                ${formatPrice(totalPrice * 1.15 + shipmentPrice)}
              </p>
            </div>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
