import React from "react";

interface ProductsPerPageSwitcherProps {
  className: string;
  page: number;
  productsPerPage: number;
  setPage: (page: number) => void;
  setProductsPerPage: (perPage: number) => void;
}

const ProductsPerPageSwitcher: React.FC<ProductsPerPageSwitcherProps> = ({
  className,
  page,
  productsPerPage,
  setPage,
  setProductsPerPage,
}) => {
  const changeProductsPerPage = (newProductsPerPage: number) => {
    const firstProductInPage = page * productsPerPage;
    const newPage = Math.floor(firstProductInPage / newProductsPerPage);

    setProductsPerPage(newProductsPerPage);
    setPage(newPage);
  };

  return (
    <div className={`${className} text-center text-sm`}>
      <label
        className="block font-medium text-gray-500"
        htmlFor="productsPerPage"
      >
        Products per page
      </label>
      <div
        className="flex w-full rounded-md -space-x-px"
        id="productsPerPage"
        role="group"
      >
        <button
          className={`px-4 py-2 w-full leading-tight text-gray-500 border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
            productsPerPage === 20 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => changeProductsPerPage(20)}
        >
          20
        </button>
        <button
          className={`px-4 py-2 w-full leading-tight text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700 ${
            productsPerPage === 30 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => changeProductsPerPage(30)}
        >
          30
        </button>
        <button
          className={`px-4 py-2 w-full leading-tight text-gray-500 border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
            productsPerPage === 40 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => changeProductsPerPage(40)}
        >
          40
        </button>
      </div>
    </div>
  );
};

export default ProductsPerPageSwitcher;
