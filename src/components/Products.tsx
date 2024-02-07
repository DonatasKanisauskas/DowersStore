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
  const [categories, setCategories] = useState<string[]>([]);

  const closePopup = () => {
    // window.history.replaceState({}, document.title);
    navigate("/", { replace: true });
    setError(null);
  };

  // on Component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  // on Products update
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products${
            category ? "/category/" + category : ""
          }?skip=${productsPerPage * page}&limit=${productsPerPage}`
        );
        const data = await response.json();
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

  const dropdownMenu = document.getElementById("category-menu") as HTMLElement;
  const searchInput = document.getElementById(
    "search-input"
  ) as HTMLInputElement;

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    clearCategorySearch();
    dropdownMenu.classList.toggle("hidden");
  };

  const openCategoriesDropDown = () => {
    toggleDropdown();
  };

  // Add event listener to filter items based on input
  const searchCategory = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const items = dropdownMenu.querySelectorAll("p");

    items.forEach((item) => {
      const text = item?.textContent?.toLowerCase();
      if (text?.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  const selectCategory = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const selectedCategorie = (e.target as HTMLParagraphElement).textContent;
    console.log(selectedCategorie);
    navigate(
      `/${selectedCategorie}/products?p=${previousPage}&pc=${productsPerPage}`
    );
    toggleDropdown();
  };

  const showAllCategories = () => {
    navigate(`/products?p=${previousPage}&pc=${productsPerPage}`);
    toggleDropdown();
  };

  const clearCategorySearch = () => {
    searchInput.value = "";

    const items = dropdownMenu.querySelectorAll("p");
    items.forEach((item) => {
      item.style.display = "block";
    });
  };

  return (
    <>
      {/* Product filters */}
      <div className="flex justify-end items-center gap-5 m-10">
        <div className="relative group text-sm">
          <label
            htmlFor="categories"
            className="block font-medium text-gray-500 text-center"
          >
            Categories
          </label>
          <button
            id="category-button"
            onClick={openCategoriesDropDown}
            className="flex items-center px-4 py-2 leading-tight text-center text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 bg-white"
          >
            <span>{category || "All categories"}</span>
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div
            id="category-menu"
            className="hidden absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 max-h-[200px] min-w-[200px] overflow-y-scroll"
          >
            <input
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search items"
              autoComplete="off"
              onChange={searchCategory}
            />
            <p
              key="All"
              onClick={showAllCategories}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md font-bold"
            >
              All categories
            </p>
            {categories.map((category, i) => (
              <p
                key={i}
                onClick={selectCategory}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              >
                {category}
              </p>
            ))}
          </div>
        </div>

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
