import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import Star from "../../assets/Star";
import { productType } from "../../types/ProductType";
import Button from "../Button";

export default function ProductCard(product: productType) {
  const addToCart = (product: productType) => {
    console.log("adding", product.title, "to cart");
  };

  return (
    <>
      <div className="w-full p-5 max-w-xs bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        {/* TOP */}
        <Link
          className="h-[250px] flex items-center"
          to={"/products/" + product.id}
        >
          {product.thumbnail ? (
            <img
              className="max-h-full m-auto"
              src={product.thumbnail}
              alt="product"
            />
          ) : (
            <Star />
          )}
        </Link>

        {/* MID */}
        <div>
          {/* Title */}
          <Link to={"/products/" + product.id}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {product.title}
            </h5>
          </Link>

          {/* Description */}
          <p className="tracking-tight text-gray-900">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center mt-2.5 mb-5 gap-4">
            {/* Rating Stars */}
            <StarRating rating={product.rating} />

            {/* Rating Score */}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.rating}
            </span>
          </div>
        </div>

        {/* BOT */}
        <div>
          {/* Price and btn */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>

            {/* Add To Cart */}
            <Button onClick={() => addToCart(product)} value="Add to cart" />
          </div>
        </div>
      </div>
    </>
  );
}
