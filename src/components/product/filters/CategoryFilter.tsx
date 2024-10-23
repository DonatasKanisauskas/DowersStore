import React, { useEffect, useRef, useState } from "react";
import { CategoryType } from "../../../types/CategoryType";
const api_url = import.meta.env.VITE_API_URL;

interface CategoryFilterProps {
  className?: string;
  categoryid: number;
  setNewCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

export default function CategoryFilter({
  className,
  categoryid,
  setNewCategoryId,
}: CategoryFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api_url}/categories`);
        const data = await response.json();
        if (Array.isArray(data)) setCategories(data);
        else
          console.error("error", `Error fetching categories: ${data.message}`);
      } catch (err) {
        console.error("error", `${err instanceof Error ? err.message : err}`);
      }
    };

    fetchCategories();
  }, []);

  // Scroll to top when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setSearchTerm("");
  };

  const searchCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const selectCategory = (selectedCategoryId: number) => {
    setNewCategoryId(selectedCategoryId);
    toggleDropdown();
  };

  const showAllProducts = () => {
    setNewCategoryId(0);
    toggleDropdown();
  };

  return (
    <div className={`${className} relative group text-sm`}>
      <label
        className="block font-medium text-gray-500 text-center"
        htmlFor="category-button"
      >
        Categories
      </label>
      <button
        className="flex w-full items-center justify-between px-4 h-[35.5px] leading-tight text-center text-gray-500 border border-gray-200 rounded-lg bg-white disabled:bg-gray-100 enabled:hover:hover:bg-gray-100 enabled:hover:text-gray-700"
        id="category-button"
        onClick={toggleDropdown}
        disabled={categories.length === 0}
        data-tooltip-target="tooltip-bottom"
        data-tooltip-placement="bottom"
      >
        {/* Show the selected category name */}
        <span>
          {categories.find((cat) => cat.id === categoryid)?.name ||
            "Select a category"}
        </span>
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {categories.length > 0 && (
        <div
          ref={dropdownRef}
          id="category-menu"
          className={`${
            isDropdownOpen ? "" : "hidden"
          } absolute right-0 mt-2 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 max-h-[200px] min-w-full sm:min-w-[200px] overflow-y-scroll`}
        >
          <input
            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
            id="categoryFilterSearch"
            type="text"
            placeholder="Search category"
            autoComplete="off"
            onChange={searchCategory}
            value={searchTerm}
          />
          <p
            key="All"
            onClick={showAllProducts}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md font-bold"
          >
            All products
          </p>
          {categories
            .filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((category) => (
              <p
                key={category.id}
                onClick={() => selectCategory(category.id)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              >
                {category.name}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
