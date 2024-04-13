import React, { FC, useEffect } from "react";
import Timer from "../Home/Timer";
import { BiMemoryCard, BiPlus, BiTrash } from "react-icons/bi";
import { MdOutlineScreenshot } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { CgBattery } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { En_To_Fa } from "@/utils/functions";
import { ProductData } from "@/utils/type";
import ProductColorItem from "./ProductColorItem";
import Link from "next/link";
import { useCategoryStore, useCompareProductStore } from "@/store/store";

interface IProps {
  product: ProductData;
}

const ProductCard: FC<IProps> = ({ product }) => {
  const { categories, fetchCategories } = useCategoryStore((state) => state);
  const {
    compareProducts,
    isExistsInCompareProducts,
    addToCompareProducts,
    removeFromCompareProducts,
    showCompareProducts,
  } = useCompareProductStore((state) => state);

  const findCategory = categories.find(
    (category) => category._id === product.category
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  if (product && product._id && product.images)
    return (
      <div className="relative hidden sm:flex flex-col gap-5 items-center rounded-lg p-4 border shadow-md">
        {/* Add To Compare Products Button  */}
        {showCompareProducts ? (
          isExistsInCompareProducts(product._id) ? (
            <button
              className="flex items-center gap-2 transition-all duration-100 absolute right-3 top-3 bg-blue-600 text-white text-base border border-slate-500 px-5 py-1.5 rounded-md shadow-lg"
              onClick={() => removeFromCompareProducts(product._id || "")}
            >
              <span>حذف</span>
              <BiTrash size={18} />
            </button>
          ) : (
            <button
              className="flex items-center gap-2 transition-all duration-100 absolute right-3 top-3 bg-white text-black text-base border border-slate-500 px-5 py-1.5 rounded-md shadow-lg"
              onClick={() => addToCompareProducts(product)}
            >
              <span>اضافه</span>
              <BiPlus />
            </button>
          )
        ) : null}

        {/* Product Discount  */}
        <Timer hours={product.discountTime!} product={product} />

        {/* Product Colors  */}
        <div className="flex flex-col gap-2 absolute right-2 top-16">
          {product.images.map((item, index) => (
            <ProductColorItem key={index} item={item} />
          ))}
        </div>

        {/* Product Image  */}
        <Link href={`/product/${product._id}`}>
          <img
            src={product.images[0].file}
            alt={product.name}
            className="w-40 object-cover"
          />
        </Link>

        {/* Product Specifications  */}
        {findCategory &&
        (findCategory.name === "لپ تاپ" ||
          findCategory.name === "گوشی موبایل") ? (
          <div className="flex justify-between items-center text-[10px] w-full px-4">
            <div className="flex flex-col items-center gap-2">
              <BiMemoryCard size={18} />
              <span>{product.specifications.ram.split(" ")[0]}GB</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MdOutlineScreenshot size={18} />
              <span>{product.specifications.screenSize}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IoCameraOutline size={18} />
              <span>{product.specifications.mainCamera}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CgBattery size={18} />
              <span>{product.specifications.battery}</span>
            </div>
          </div>
        ) : null}
        {/* Product Name  */}
        <div>
          <h4 className="leading-6 text-black text-sm">{product.name}</h4>
        </div>
        {/* Product Rating  */}
        <div className="flex items-center justify-end w-full text-sm gap-1">
          <FaStar color="#f59e0b" />
          <span>{En_To_Fa(`${product.rating}`)}</span>
        </div>
        {/* Product Price  */}
        <div className="flex flex-col gap-1 w-full text-lg">
          {product.discount ? (
            <div className="flex justify-between items-center text-red-600 font-semibold">
              <span className="bg-red-600 text-white p-1 rounded text-xs">
                % {En_To_Fa(`${product.discount}`)}
              </span>
              <div className="flex items-center justify-end gap-1 font-semibold">
                <span>
                  {En_To_Fa(
                    `${(
                      product.images[0].price -
                      product.images[0].price * (product.discount / 100)
                    ).toLocaleString("fa-IR")}`
                  )}
                </span>
                <span className="text-sm">تومان</span>
              </div>
            </div>
          ) : null}
          <div className="flex items-center justify-end gap-1 font-semibold">
            <span
              className={`${product.discount && "line-through"} text-gray-500`}
            >
              {En_To_Fa(`${product.images[0].price.toLocaleString("fa-IR")}`)}
            </span>
            <span className="text-sm">تومان</span>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;
