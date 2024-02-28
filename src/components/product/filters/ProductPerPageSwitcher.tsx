interface ProductsPerPageSwitcherProps {
  className?: string;
  page: number;
  productsPerPage: number;
  setPage: (page: number) => void;
  setProductsPerPage: (perPage: number) => void;
}

const productsCount = [20, 30, 40];

export default function ProductsPerPageSwitcher({
  className,
  page,
  productsPerPage,
  setPage,
  setProductsPerPage,
}: ProductsPerPageSwitcherProps) {
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
        className="flex h-[35.5px] w-full rounded-md -space-x-px"
        id="productsPerPage"
        role="group"
      >
        {productsCount.map((count, i) => (
          <button
            key={`products${count}`}
            className={`px-4 w-full leading-tight text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700
              ${productsPerPage === count ? "bg-blue-50" : "bg-white"}
              ${i === 0 && "rounded-l-lg"}
              ${productsCount.length - 1 === i && "rounded-r-lg"}
            `}
            onClick={() => changeProductsPerPage(count)}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}
