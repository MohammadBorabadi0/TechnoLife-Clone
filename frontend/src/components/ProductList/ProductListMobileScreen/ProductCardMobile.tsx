// import Timer from "./Timer";
import Timer from "@/components/Home/Timer";
import { ProductData } from "@/utils/type";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ProductColorItem from "../ProductColorItem";
import Link from "next/link";
import { En_To_Fa } from "@/utils/functions";
import { FaStar } from "react-icons/fa";
import { useCategoryStore, useCompareProductStore } from "@/store/store";
import { BiMemoryCard, BiPlus, BiTrash } from "react-icons/bi";
import { MdOutlineScreenshot } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { CgBattery } from "react-icons/cg";

interface IProps {
  product: ProductData;
}

const ProductCardMobile: FC<IProps> = ({ product }) => {
  const [category, setCategory] = useState<string | null>(null);

  const { categories } = useCategoryStore((state) => state);
  const {
    showCompareProducts,
    addToCompareProducts,
    removeFromCompareProducts,
    isExistsInCompareProducts,
  } = useCompareProductStore((state) => state);

  // Find Category Name
  useEffect(() => {
    const findCategory = categories.find(
      (category) => category._id === product.category
    );
    if (findCategory) {
      setCategory(findCategory.name);
    }
  }, [categories]);

  return (
    <div className="text-sm sm:hidden relative">
      {/* Product Discount Timer   */}
      {product.discount && product.discountTime ? (
        <Timer hours={product.discountTime} product={product} />
      ) : null}

      <Link
        href={`/product/${product._id}`}
        className="flex justify-between gap-5"
      >
        <div className="flex flex-col gap-7">
          <h4 className="text-black font-semibold leading-7">{product.name}</h4>
          {/* Product Rating  */}
          <div className="flex items-center justify-end w-full text-sm gap-1">
            <FaStar color="#f59e0b" />
            <span>{En_To_Fa(`${product.rating?.toFixed(1)}`)}</span>
          </div>

          {/* Product Specifications  */}
          {category && (category === "لپ تاپ" || category === "گوشی موبایل") ? (
            <div className="flex justify-between items-center text-[10px] w-full px-4">
              <div className="flex flex-col items-center gap-2">
                <BiMemoryCard size={18} />
                <span>{product.specifications.ram.split(" ")[0]}GB</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MdOutlineScreenshot size={18} />
                <span>{product.specifications.screenSize}</span>
              </div>
              {category === "گوشی موبایل" && (
                <>
                  <div className="flex flex-col items-center gap-2">
                    <IoCameraOutline size={18} />
                    <span>{product.specifications.mainCamera}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CgBattery size={18} />
                    <span>{product.specifications.battery}</span>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-5">
          <Image
            src={product.images[0].file}
            alt={product.name}
            title={product.name}
            width={200}
            height={200}
            className="max-w-[150px] object-contain"
          />

          {/* Product Colors  */}
          <div className="flex gap-2 justify-center">
            {product.images.map((item, index) => (
              <ProductColorItem key={index} item={item} />
            ))}
          </div>

          {/* Product Price  */}
          <div className="flex flex-col items-center gap-1 w-full text-sm font-semibold">
            {product.discount ? (
              <div className="flex w-full gap-3 text-red-500">
                <div className="grid place-items-center bg-red-500 text-white h-5 w-7 rounded">
                  <span className="text-xs pt-0.5">
                    % {En_To_Fa(`${product.discount}`)}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <span>
                    {En_To_Fa(
                      `${(
                        product.images[0].price -
                        product.images[0].price * (product.discount / 100)
                      ).toLocaleString("fa-IR")}`
                    )}
                  </span>
                  <span className="font-normal">تومان</span>
                </div>
              </div>
            ) : null}
            <div className="flex items-center gap-1">
              <span
                className={`${
                  product.discount && "line-through"
                } text-gray-500`}
              >
                {En_To_Fa(`${product.images[0].price.toLocaleString("fa-IR")}`)}
              </span>
              {!product.discount && <span className="font-normal">تومان</span>}
            </div>
          </div>
        </div>
      </Link>
      <span className="border-y block py-[1px] mt-5"></span>

      {/* Add To Compare Products Button  */}
      {showCompareProducts && product._id ? (
        isExistsInCompareProducts(product._id) ? (
          <button
            className="flex items-center gap-2 transition-all duration-100 absolute right-3 bottom-3 bg-blue-600 text-white border border-slate-500 px-4 py-1 rounded-md shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              removeFromCompareProducts(product._id!);
            }}
          >
            <span>حذف</span>
            <BiTrash size={18} />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 transition-all duration-100 absolute right-3 bottom-3 bg-white text-black border border-slate-500 px-4 py-1 rounded-md shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              addToCompareProducts(product);
            }}
          >
            <span>اضافه</span>
            <BiPlus />
          </button>
        )
      ) : null}
    </div>
  );
};

export default ProductCardMobile;
