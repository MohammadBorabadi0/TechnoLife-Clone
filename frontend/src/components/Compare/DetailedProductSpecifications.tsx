import { ICategory, ProductData } from "@/utils/type";
import { FC } from "react";
import { BiMemoryCard } from "react-icons/bi";
import { CgBattery } from "react-icons/cg";
import { FiCpu } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineScreenshot } from "react-icons/md";

interface IProps {
  product: ProductData;
  category: ICategory;
}

const DetailedProductSpecifications: FC<IProps> = ({ product, category }) => {
  const { ram, screenSize, mainCamera, battery, cpu } = product.specifications;

  const extractNumber = (text: string): number | null => {
    const match = text.match(/\d+/);
    return match ? parseFloat(match[0]) : null;
  };

  return (
    <div className="flex justify-between items-center text-[10px] w-full px-4">
      {ram && (
        <div className="flex flex-col items-center gap-2">
          <BiMemoryCard size={18} />
          <span>{extractNumber(ram)}GB</span>
        </div>
      )}
      {screenSize && (
        <div className="flex flex-col items-center gap-2">
          <MdOutlineScreenshot size={18} />
          <span>{extractNumber(screenSize)}</span>
        </div>
      )}
      {mainCamera && category.name === "گوشی موبایل" && (
        <div className="flex flex-col items-center gap-2">
          <IoCameraOutline size={18} />
          <span>{extractNumber(mainCamera)}</span>
        </div>
      )}
      {battery && category.name === "گوشی موبایل" && (
        <div className="flex flex-col items-center gap-2">
          <CgBattery size={18} />
          <span>{extractNumber(battery)}</span>
        </div>
      )}
      {cpu && (
        <div className="flex flex-col items-center gap-2">
          <FiCpu size={18} />
          <span>{cpu.slice(0, 9)}</span>
        </div>
      )}
    </div>
  );
};

export default DetailedProductSpecifications;
