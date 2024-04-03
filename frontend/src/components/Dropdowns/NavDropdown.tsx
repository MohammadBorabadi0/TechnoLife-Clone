import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { FiChevronLeft, FiDollarSign } from "react-icons/fi";
import { BiChevronLeft, BiMemoryCard } from "react-icons/bi";
import { FC, ReactNode, useState } from "react";
import Image from "next/image";
import MobileContent from "./MobileContent";
import IconComponent from "./IconComponent";

interface IProps {
  category: any;
}

const NavDropdown: FC<IProps> = ({ category }) => {
  const [hoveredElement, setHoveredElement] = useState("");

  return (
    <div
      onMouseLeave={() => setHoveredElement("")}
      className="flex invisible absolute group-hover:visible max-h-[496px] min-h-fit text-lg text-gray-800 whitespace-nowrap top-[42px] -right-3 bg-white shadow-3xl overflow-hidden rounded-lg z-50"
    >
      <div className="flex flex-col gap-5 bg-white w-[350px] py-8">
        <div
          className="flex group/item items-center justify-between px-4"
          onMouseEnter={() => setHoveredElement(`first-${category.name}`)}
        >
          <div className="flex items-center gap-2">
            <span className="block p-2 text-2xl rounded-full bg-gray-50">
              <IconComponent categoryName={category.name} />
            </span>
            <h3>{category.name}</h3>
          </div>
          <BiChevronLeft
            size={23}
            className="invisible group-hover/item:visible group-hover/item:visited:visible"
          />
        </div>

        <div
          className="flex group/item items-center justify-between px-4"
          onMouseEnter={() => setHoveredElement(`second-${category.name}`)}
        >
          <div className="flex items-center gap-2">
            {category.name === "گوشی موبایل" ? (
              <>
                <span className="block p-2 bg-gray-50 rounded-full">
                  <IoSettingsSharp size={20} className="text-green-600" />
                </span>
                <h3>موبایل براساس عملکرد</h3>
              </>
            ) : (
              <>
                <span className="block p-2 bg-gray-50 rounded-full">
                  <Image
                    src="/images/usage.svg"
                    alt="usage-icon"
                    height={22}
                    width={22}
                  />
                </span>
                <h3>{category.name} براساس کاربرد</h3>
              </>
            )}
          </div>
          <BiChevronLeft
            size={23}
            className="invisible group-hover/item:visible"
          />
        </div>

        <div
          className="flex group/item items-center justify-between px-4"
          onMouseEnter={() => setHoveredElement(`third-${category.name}`)}
        >
          <div className="flex items-center gap-2">
            <span className="block p-2 bg-gray-50 rounded-full">
              <FiDollarSign size={20} className="text-green-600" />
            </span>
            <h3>{category.name} براساس قیمت</h3>
          </div>
          <BiChevronLeft
            size={23}
            className="invisible group-hover/item:visible"
          />
        </div>

        {category.name === "گوشی موبایل" && (
          <div
            className="flex group/item items-center justify-between px-4"
            onMouseEnter={() => setHoveredElement(`forth-${category.name}`)}
          >
            <div className="flex items-center gap-2">
              <span className="block p-2 bg-gray-50 rounded-full">
                <BiMemoryCard size={20} className="text-red-600" />
              </span>
              <h3>موبایل براساس حافظه</h3>
            </div>
            <BiChevronLeft
              size={23}
              className="invisible group-hover/item:visible"
            />
          </div>
        )}
      </div>

      {hoveredElement.includes("first") && (
        <div className="bg-blue-50 p-8">
          {hoveredElement.split("-")[1].includes(category.name) && (
            <MobileContent categoryName={category.name} />
          )}
        </div>
      )}
      {hoveredElement.includes("second") && (
        <div className="bg-blue-50 p-8">Second</div>
      )}
      {hoveredElement.includes("third") && (
        <div className="bg-blue-50 p-8">Third</div>
      )}
      {hoveredElement.includes("forth") && (
        <div className="bg-blue-50 p-8">Forth</div>
      )}
    </div>
  );
};

export default NavDropdown;
