import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { productType } from "../types/ProductType";
import { ProductCard, Pagination } from "../components/product";
import {
  ProductsPerPageSwitcher,
  CategoryFilter,
  Search,
} from "../components/product/filters";
const api_url = import.meta.env.VITE_API_URL;

export default function Products() {
  const { categoryid } = useParams();
  const { state, search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const initialPage = parseInt(queryParams.get("p") || "0", 10);
  const initialProductsPerPage = parseInt(queryParams.get("pc") || "30", 10);

  const [page, setPage] = useState<number>(initialPage);
  const [productsPerPage, setProductsPerPage] = useState<number>(
    initialProductsPerPage
  );
  const [newCategoryId, setNewCategoryId] = useState<number>(
    Number(categoryid) || 0
  );
  const [products, setProducts] = useState<productType[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // products update
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${api_url}/products${categoryid ? "?category_id=" + categoryid : ""}`
        );
        // const response = await fetch(
        //   `https://webstorejs.azurewebsites.net/api/${
        //     category ? category + "/" : ""
        //   }products?skip=${productsPerPage * page}&limit=${productsPerPage}`
        // );
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
  }, [categoryid, state, page, productsPerPage]);

  // url update
  useEffect(() => {
    if (Number(categoryid) !== newCategoryId && newCategoryId !== 0) setPage(0);
    navigate(
      `${
        newCategoryId ? "/" + newCategoryId : ""
      }/products?p=${page}&pc=${productsPerPage}`
    );
  }, [categoryid, newCategoryId, page, productsPerPage, navigate]);

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
          categoryid={newCategoryId || 0}
          setNewCategoryId={setNewCategoryId}
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
