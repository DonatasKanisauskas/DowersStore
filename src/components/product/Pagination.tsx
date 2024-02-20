import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  productsPerPage: number;
  totalProducts: number;
}

export default function Pagination({
  page,
  setPage,
  productsPerPage,
  totalProducts,
}: PaginationProps) {
  const nextPage = () => {
    const nextPage = page + 1;
    const hasMorePages = productsPerPage * nextPage < totalProducts;

    if (hasMorePages) {
      setPage(nextPage);
    }
  };

  const previousPage = () => {
    const previousPage = page - 1;
    if (previousPage >= 0) {
      setPage(previousPage);
    }
  };

  return (
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
  );
}
