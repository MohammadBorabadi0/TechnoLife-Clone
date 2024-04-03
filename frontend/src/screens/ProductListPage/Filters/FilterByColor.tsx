import { useColorStore, useProductStore } from "@/store/store";
import { IColor } from "@/utils/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface IProps {
  createQueryString: (name: string, value: string) => string;
  handleCheckBox: (colorName: string) => void;
}

const FilterByColor: FC<IProps> = ({ createQueryString, handleCheckBox }) => {
  const [showColors, setShowColors] = useState(false);
  // const [colorsExistInPage, setColorsExistInPage] = useState<IColor[]>([]);

  // -----------------------------------------------------------------------

  // Store
  const { filteredProducts } = useProductStore((state) => state);
  const { colors, fetchColors } = useColorStore((state) => state);

  // -----------------------------------------------------------------------

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (filteredProducts) {
  //     const colorIds = filteredProducts.flatMap((nestedArray) =>
  //       nestedArray.images.map((item) => item.color)
  //     );
  //     setColorsExistInPage(
  //       colors.filter((color) => colorIds.includes(color._id))
  //     );
  //   }
  // }, [filteredProducts, colors]);

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="flex flex-col gap-2 px-3">
      <button
        className="flex justify-between"
        onClick={() => setShowColors(!showColors)}
      >
        <span>رنگ ها</span>
        {showColors ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
      </button>
      {showColors && (
        <ul>
          {colors.map((color, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-black text-xs px-1 py-2 cursor-default"
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("color", color.name)
                );
              }}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id={color._id}
                  checked={
                    searchParams.get("color")?.includes(color.name) || false
                  }
                  onChange={() => handleCheckBox(color.name)}
                  className="w-4 h-4 border-2"
                />

                <div
                  className="h-3 w-8 border rounded-sm"
                  style={{ backgroundColor: color.code }}
                ></div>
              </div>
              <label htmlFor={color._id}></label>
              {color.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterByColor;
