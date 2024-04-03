import React, { FC, useEffect } from "react";
import NavDropdown from "../Dropdowns/NavDropdown";
import { PiSpeakerHifiFill, PiWatchDuotone } from "react-icons/pi";
import { MdOutlineTabletMac } from "react-icons/md";
import { CgLaptop } from "react-icons/cg";
import { ImMobile } from "react-icons/im";
import Image from "next/image";
import { GiConsoleController } from "react-icons/gi";
import { useCategoryStore } from "@/store/store";

interface IProps {
  visible: boolean;
}

const Navbar: FC<IProps> = ({ visible }) => {
  const { categories, fetchCategories } = useCategoryStore((state) => state);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header
      className={`hidden lg:flex items-center fixed top-[85px] h-11 w-full bg-white z-20 transition duration-200 ${
        visible ? "border-b" : "-translate-y-full"
      }`}
    >
      <nav className="h-full px-5">
        <ul className="flex items-center h-full gap-6 text-xs font-semibold cursor-default">
          {categories.map((category, index) => (
            <li key={index} className="group h-full flex items-center relative">
              <span>{category.name}</span>
              <NavDropdown category={category} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
