import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <BiMenu size={25} />
      </button>

      <div
        onClick={(e) => setIsOpen(false)}
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            isOpen ? "right-0" : "-right-full"
          } fixed top-0 w-[305px] h-full flex flex-col bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setIsOpen(false)}>
              <IoClose size={25} />
            </button>
            {/* Logo  */}
            <h2 className="logo text-lg whitespace-nowrap">
              <span className="text-yellow-600">Easy</span> Shop
            </h2>
          </div>
          <ul className="mt-3 py-5 border-t flex flex-col gap-5">
            <li className="flex flex-col gap-5">
              <div className="flex items-center justify-between text-sm px-4">
                گوشی موبایل
                <span>
                  <FiChevronDown />
                </span>
              </div>
              <div className="flex flex-col gap-5 bg-blue-50 px-8 py-4">
                <span className="flex items-center justify-between">
                  گوشی براساس عملکرد
                  <FiChevronDown />
                </span>
                <span className="flex items-center justify-between">
                  گوشی براساس قیمت
                  <FiChevronDown />
                </span>
                <span className="flex items-center justify-between">
                  گوشی براساس حافظه
                  <FiChevronDown />
                </span>
              </div>
            </li>
            <li className="flex items-center justify-between text-sm">
              لپ تاپ
              <span>
                <FiChevronDown />
              </span>
            </li>
            <li className="flex items-center justify-between text-sm">
              تبلت
              <span>
                <FiChevronDown />
              </span>
            </li>
            <li className="flex items-center justify-between text-sm">
              هدفون و هندزفری
              <span>
                <FiChevronDown />
              </span>
            </li>
            <li className="flex items-center justify-between text-sm">
              لوازم خانگی
              <span>
                <FiChevronDown />
              </span>
            </li>
            <li className="flex items-center justify-between text-sm">
              گیمینگ
              <span>
                <FiChevronDown />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
