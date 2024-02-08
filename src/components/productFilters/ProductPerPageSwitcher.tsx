import React from "react";

interface ProductsPerPageSwitcherProps {
  productsPerPage: number;
  setProductsPerPage: (perPage: number) => void;
}

const ProductsPerPageSwitcher: React.FC<ProductsPerPageSwitcherProps> = ({
  productsPerPage,
  setProductsPerPage,
}) => {
  return (
    <div className="text-center text-sm">
      <label
        htmlFor="productsPerPage"
        className="block font-medium text-gray-500"
      >
        Products per page
      </label>
      <div
        className="flex rounded-md -space-x-px"
        role="group"
        id="productsPerPage"
      >
        <button
          className={`px-4 py-2 leading-tight text-gray-500 border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
            productsPerPage === 20 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => setProductsPerPage(20)}
        >
          20
        </button>
        <button
          className={`px-4 py-2 leading-tight text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700 ${
            productsPerPage === 30 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => setProductsPerPage(30)}
        >
          30
        </button>
        <button
          className={`px-4 py-2 leading-tight text-gray-500 border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
            productsPerPage === 40 ? "bg-blue-50" : "bg-white"
          }`}
          onClick={() => setProductsPerPage(40)}
        >
          40
        </button>
      </div>
    </div>
  );
};

export default ProductsPerPageSwitcher;
