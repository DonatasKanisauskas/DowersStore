import React, { useEffect, useRef, useState } from "react";

interface CategoryFilterProps {
  className: string;
  category: string;
  setNewCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  className,
  category,
  setNewCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectCategory = (selectedCategory: string) => {
    setNewCategory(selectedCategory);
    toggleDropdown();
  };

  const showAllProducts = () => {
    setNewCategory("");
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
        className="flex w-full items-center justify-between px-4 py-2 leading-tight text-center text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 bg-white"
        id="category-button"
        onClick={toggleDropdown}
      >
        <span>{category}</span>
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
            category.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((category, i) => (
            <p
              key={i}
              onClick={() => selectCategory(category)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
            >
              {category}
            </p>
          ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
