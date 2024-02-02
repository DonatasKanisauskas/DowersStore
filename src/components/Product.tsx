import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import Star from "../assets/Star";

export interface productType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string, string, string, string];
}

export default function Product(product: productType) {
  // console.log(product);

  const addToCart = (product: productType) => {
    console.log("adding", product.title, "to cart");
  };

  return (
    <>
      <div className=" w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        {/* TOP */}
        <Link
          className="h-[250px] px-5 pt-5 flex items-center"
          to={"/products/" + product.id}
        >
          {product.thumbnail ? (
            <img
              className="max-h-full m-auto"
              src={product.thumbnail}
              alt="product"
            />
          ) : (
            <Star fill="black" />
          )}
        </Link>

        {/* MID */}
        <div className="px-5">
          {/* Title */}
          <Link to={"/products/" + product.id}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {product.title}
            </h5>
          </Link>

          {/* Description */}
          <p className="tracking-tight text-gray-900">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center mt-2.5 mb-5">
            {/* Rating Stars */}
            <StarRating rating={product.rating} />

            {/* Rating Score */}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.rating}
            </span>
          </div>
        </div>

        {/* BOT */}
        <div className="px-5 pb-5">
          {/* Price and btn */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>

            {/* Add To Cart */}
            <button
              onClick={() => addToCart(product)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
