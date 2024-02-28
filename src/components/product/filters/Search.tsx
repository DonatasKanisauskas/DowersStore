import { useState } from "react";
import { productType } from "../../../types/ProductType";

interface SearchProps {
  className?: string;
  setProducts: React.Dispatch<React.SetStateAction<productType[] | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Search({
  className,
  setProducts,
  setError,
}: SearchProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const search = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products${
          inputValue && "/search?q=" + inputValue
        }`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Error fetching categories: ${err.message}`
          : `Unexpected error: ${err}`
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className={`${className} text-center text-sm`}>
      <label htmlFor="search" className="block font-medium text-gray-500">
        Search
      </label>
      <div className="flex w-full h-[35.5px] px-2 gap-2 items-center justify-between leading-tight text-center text-gray-500 border border-gray-200 rounded-lg bg-white">
        <div className="px-1">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          type="search"
          id="default-search"
          className="outline-none"
          placeholder="Search for item..."
          required
        />
        <button
          className="py-1 px-2 rounded-md hover:bg-blue-50 hover:text-gray-700"
          onClick={search}
        >
          Search
        </button>
      </div>
    </div>
  );
}
