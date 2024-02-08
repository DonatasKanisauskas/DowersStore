import Product, { productType } from "./Product";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import ProductsPerPageSwitcher from "./productFilters/ProductPerPageSwitcher";
import CategoryFilter from "./productFilters/CategoryFilter";
import Pagination from "./Pagination";

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
  const [newCategory, setNewCategory] = useState<string>(category || "");
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

  // first mount update
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

  // products update
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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setError(state);
  }, [category, state, page, productsPerPage]);

  // url update
  useEffect(() => {
    if (category !== newCategory && newCategory !== "") setPage(0);
    navigate(
      `${
        newCategory ? "/" + newCategory : ""
      }/products?p=${page}&pc=${productsPerPage}`
    );
  }, [category, newCategory, page, productsPerPage, navigate]);

  return (
    <>
      {/* Product filters */}
      <div className="flex justify-end items-center gap-5 m-10">
        <CategoryFilter
          categories={categories}
          category={category || "All products"}
          setNewCategory={setNewCategory}
        />

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

      <Pagination
        page={page}
        setPage={setPage}
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
      />
    </>
  );
}
