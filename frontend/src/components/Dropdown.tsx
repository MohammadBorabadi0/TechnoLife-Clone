import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        type="button"
        onMouseOver={openDropdown}
        onMouseLeave={closeDropdown}
      >
        Dropdown
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 14.95a1 1 0 01-1.414 0l-4.242-4.243a1 1 0 111.414-1.414L10 12.586l3.536-3.536a1 1 0 111.414 1.414l-4.243 4.243z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
          onMouseOver={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
