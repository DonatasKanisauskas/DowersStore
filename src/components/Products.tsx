import Product, { productType } from "./Product";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PopUp from "./PopUp";

export default function Products() {
  const { category } = useParams();
  const { state } = useLocation();
  const [products, setProducts] = useState<productType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [productsPerPage, setProductsPerPage] = useState<number>(30);
  const [page, setPage] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const closePopup = () => {
    window.history.replaceState({}, document.title);
    setError(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products?skip=${
            productsPerPage * page
          }&limit=${productsPerPage}${category ? "/category/" + category : ""}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setError(state);
  }, [category, state, page, productsPerPage]);

  const nextPage = () => {
    const nextPageNumber = page + 1;
    const hasMorePages = productsPerPage * nextPageNumber < totalProducts;

    if (hasMorePages) {
      setPage(nextPageNumber);
    }
  };

  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center gap-5 m-10">
        <label
          htmlFor="productsPerPage"
          className="block text-sm font-medium text-gray-900"
        >
          Products per page:
        </label>
        <div
          className="flex rounded-md -space-x-px text-sm"
          role="group"
          id="productsPerPage"
        >
          <button
            className={`px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
              productsPerPage === 20 && " bg-blue-50"
            }`}
            onClick={() => setProductsPerPage(20)}
          >
            20
          </button>
          <button
            className={`px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-700 ${
              productsPerPage === 30 && "bg-blue-50"
            }`}
            onClick={() => setProductsPerPage(30)}
          >
            30
          </button>
          <button
            className={`px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              productsPerPage === 40 && "bg-blue-50"
            }`}
            onClick={() => setProductsPerPage(40)}
          >
            40
          </button>
        </div>
      </div>

      {error && <PopUp closePopup={closePopup} error={error} />}

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {products
          ? products instanceof Array &&
            products.map((product) => <Product {...product} key={product.id} />)
          : loading && (
              <p className=" w-full text-center">Loading products...</p>
            )}
      </div>

      <nav className="flex justify-center m-10">
        <ul className="flex -space-x-px text-sm shadow">
          <li>
            <button
              className="flex items-center justify-center w-24 h-8 leading-tight text-gray-500 bg-white border border-gray-200 rounded-l-lg enabled:hover:bg-gray-100 enabled:hover:text-gray-700 disabled:opacity-50 disabled:cursor"
              onClick={previousPage}
              disabled={page === 0}
            >
              Previous
            </button>
          </li>
          <li>
            <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-200">
              {page + 1}
            </p>
          </li>
          <li>
            <button
              className="flex items-center justify-center w-24 h-8 leading-tight text-gray-500 bg-white border border-gray-200 rounded-r-lg enabled:hover:bg-gray-100 enabled:hover:text-gray-700 disabled:opacity-50 disabled:cursor"
              onClick={nextPage}
              disabled={productsPerPage * (page + 1) >= totalProducts}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
