import { ICategory, ProductData } from "@/utils/type";
import Image from "next/image";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { En_To_Fa } from "@/utils/functions";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/navigation";
import DetailedProductSpecifications from "./DetailedProductSpecifications";
import { useCompareProductStore } from "@/store/store";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface IProps {
  product: ProductData;
  category: ICategory | null;
}

const CompareProductItem: FC<IProps> = ({ product, category }) => {
  const { removeFromCompareProducts } = useCompareProductStore(
    (state) => state
  );

  const router = useRouter();

  return (
    <div className="relative flex flex-col justify-between gap-5 border-l last:border-none px-3 py-10 pb-5 min-w-[235px]">
      <div className="flex justify-center">
        <Image
          src={product.images[0].file}
          alt={product.name}
          width={300}
          height={400}
          className="w-36 xl:w-[196px] 2xl:w-[272px] object-cover"
        />
      </div>
      {/* Product Item Specifications  */}
      {category &&
      (category.name === "گوشی موبایل" || category.name === "لپ تاپ") ? (
        <DetailedProductSpecifications category={category} product={product} />
      ) : null}

      {/* Product Name */}
      <h4 className="line-clamp-3 leading-7 xl:line-clamp-2">{product.name}</h4>

      {/* Product Rating  */}
      <div className="flex items-center justify-end w-full text-sm gap-1">
        <FaStar color="#f59e0b" />
        <span>{En_To_Fa(`${product.rating?.toFixed(1)}`)}</span>
      </div>

      {/* Product Price  */}
      <div className="flex flex-col gap-1 w-full">
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
          {product.discount ? "" : <span className="text-sm">تومان</span>}
        </div>
      </div>

      <button
        className="relative flex items-center justify-center border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-lg"
        onClick={() => router.push(`/product/${product._id}`)}
      >
        <span>مشاهده و خرید</span>
        <BiChevronLeft className="absolute left-2 text-2xl" />
      </button>

      {/* Button For Remove Product From Compare Products  */}
      <button
        className="absolute right-3 top-4"
        onClick={() => removeFromCompareProducts(product._id!)}
      >
        <IoIosCloseCircleOutline size={30} />
      </button>
    </div>
  );
};

export default CompareProductItem;
