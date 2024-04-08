import { Link, useNavigate } from "react-router-dom";
import { cartProduct } from "../types/ProductType";
import { useEffect, useState } from "react";
import Cross from "../assets/Cross";
import Button from "../components/Button";

export default function Cart() {
  const shipmentPrice = 20;
  const [products, setProducts] = useState<cartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const removeFromCart = async (id: number) => {
    try {
      await fetch(
        `https://webstorejs.azurewebsites.net/api/cart/${1}/removeProduct?productId=${id}`
      );
    } catch (err) {
      const ErrorMsg = err instanceof Error ? err.message : err;
      navigate("/cart", { state: ErrorMsg });
    } finally {
      setProducts((productList) =>
        productList.filter((product) => product.id !== id)
      );
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedQuantity = quantity > 0 ? quantity : 1;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.min(updatedQuantity, product.total) }
          : product
      )
    );
  };

  // Fetch cart products
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://webstorejs.azurewebsites.net/api/cart/${1}`
        );
        const data = await response.json();
        console.log(data.products);
        console.log(data.products[0].quantity);
        if (data.message) {
          navigate("/", { state: data.message });
        } else {
          setProducts(data.products);
          data.products.map((product: cartProduct) =>
            updateQuantity(product.id, product.quantity)
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
  }, [navigate]);

  // Update total price whenever quantities change
  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * (product.quantity || 0);
    });
    setTotalPrice(total);
  }, [products]);

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

  const checkOut = () => {
    console.log("Checkout");
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
                <img
                  className="max-h-full max-w-full"
                  src={
                    product.thumbnail ||
                    "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg"
                  }
                  alt="product"
                />
              </div>

              {/* RIGHT */}
              <div className="w-full flex flex-col gap-1 py-2 justify-between">
                {/* TOP */}
                <div>
                  <div className="flex flex-row justify-between items-center">
                    <Link
                      className="font-medium overflow-hidden max-h-[24px] overflow-y-hidden"
                      to={"/products/" + product.id}
                    >
                      {product.title}
                    </Link>
                    <button
                      className="group text-gray-700 h-full bg-transparent rounded-md"
                      onClick={() => removeFromCart(product.id)}
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
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, parseInt(e.target.value))
                      }
                      id={`quantity-${product.id}`}
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
                    <p>${formatPrice(product.price * product.quantity)}</p>
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
              <p>Subtotal</p>
              <p className="font-medium">${formatPrice(totalPrice)}</p>
            </div>
            <div className="flex justify-between py-4">
              <p>Shipping estimate</p>
              <p className="font-medium">${formatPrice(shipmentPrice)}</p>
            </div>
            <div className="flex justify-between py-4">
              <p>Tax estimate</p>
              <p className="font-medium">${formatPrice(totalPrice * 0.15)}</p>
            </div>
            <div className="flex justify-between py-4">
              <p className="font-medium">Order total</p>
              <p className="font-medium">
                ${formatPrice(totalPrice * 1.15 + shipmentPrice)}
              </p>
            </div>
          </div>
          <Button className="w-full" onClick={() => checkOut()}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
