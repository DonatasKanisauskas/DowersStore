import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { productType } from "../types/ProductType";
import { ProductCard, Pagination } from "../components/product";
import {
  ProductsPerPageSwitcher,
  CategoryFilter,
  Search,
} from "../components/product/filters";

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
  const [products, setProducts] = useState<productType[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // products update
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://webstorejs.azurewebsites.net/api/products?skip=${
            productsPerPage * page
          }&limit=${productsPerPage}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err) {
        console.error("error", `${err instanceof Error ? err.message : err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 md:gap-5 sm:mx-10">
        <Search
          className="w-full max-w-xs md:w-auto"
          setProducts={setProducts}
        />

        <CategoryFilter
          className="w-full max-w-xs md:w-auto min-w-[160px]"
          category={category || "All products"}
          setNewCategory={setNewCategory}
        />

        <ProductsPerPageSwitcher
          className="w-full max-w-xs md:w-auto"
          page={page}
          productsPerPage={productsPerPage}
          setPage={setPage}
          setProductsPerPage={setProductsPerPage}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 min-h-[500px]">
        {loading ? (
          <p className="w-full text-center self-center">Loading products...</p>
        ) : products instanceof Array && products.length > 0 ? (
          products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))
        ) : (
          <div className="flex flex-col gap-10 w-full justify-center items-center">
            <p>No products found.</p>
            <Link
              to="/"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Return home
            </Link>
          </div>
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
