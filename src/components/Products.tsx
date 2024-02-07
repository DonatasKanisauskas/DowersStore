import Product, { productType } from "./Product";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import ProductsPerPageSwitcher from "./ProductPerPageSwitcher";

export default function Products() {
  const { category } = useParams();
  const { state, search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const initialPage = parseInt(queryParams.get("p") || "0", 10);
  const initialProductsPerPage = parseInt(queryParams.get("pc") || "30", 10);

  const [page, setPage] = useState<number>(initialPage);
  const [productsPerPage, setProductsPerPage] = useState<number>(
    initialProductsPerPage
  );
  const [products, setProducts] = useState<productType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const closePopup = () => {
    // window.history.replaceState({}, document.title);
    navigate("/", { replace: true });
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
        console.log(data);
        setProducts(data.products);
        setTotalProducts(data.total);

        // Update URL in useEffect to reflect fetched data and page
        navigate(`?p=${page}&pc=${productsPerPage}`);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setError(state);
  }, [category, state, page, productsPerPage, navigate]);

  const nextPage = () => {
    const nextPage = page + 1;
    const hasMorePages = productsPerPage * nextPage < totalProducts;

    if (hasMorePages) {
      setPage(nextPage);
      navigate(`?p=${nextPage}&pc=${productsPerPage}`);
    }
  };

  const previousPage = () => {
    const previousPage = page - 1;
    if (previousPage >= 0) {
      setPage(previousPage);
      navigate(`?p=${previousPage}&pc=${productsPerPage}`);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center gap-5 m-10">
        <ProductsPerPageSwitcher
          productsPerPage={productsPerPage}
          setProductsPerPage={setProductsPerPage}
        />
      </div>

      {error && <PopUp closePopup={closePopup} error={error} />}

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 min-h-[500px]">
        {loading ? (
          <p className="w-full text-center self-center">Loading products...</p>
        ) : products instanceof Array && products.length > 0 ? (
          products.map((product) => <Product {...product} key={product.id} />)
        ) : (
          <p className="w-full text-center self-center">
            No products found on this page.
          </p>
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
