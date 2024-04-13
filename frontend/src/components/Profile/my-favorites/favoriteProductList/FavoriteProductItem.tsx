import { En_To_Fa } from "@/utils/functions";
import { ProductData } from "@/utils/type";
import Image from "next/image";
import { FC, useState } from "react";
import ConfirmModal from "../modal/ConfirmModal";
import { useRouter } from "next/navigation";
import { BiTrash } from "react-icons/bi";

interface IProps {
  product: ProductData;
}

const FavoriteProductItem: FC<IProps> = ({ product }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const router = useRouter();

  return (
    <div className="relative flex justify-between bg-gray-100 p-5 rounded-lg">
      <div className="flex flex-col justify-between gap-5">
        <h4 className="leading-7 text-sm xs:text-base xl:text-lg">
          {product.name}
        </h4>

        {/* Product Price  */}
        <div className="flex items-center gap-3">
          {product.discount ? (
            <p className="line-through">
              {En_To_Fa(`${product.images[0].price.toLocaleString("fa-IR")}`)}
            </p>
          ) : null}
          {product.discount ? (
            <p className="flex gap-1 items-center">
              <span className="text-lg text-green-600 font-semibold">
                {En_To_Fa(
                  `${(
                    product.images[0].price -
                    product.images[0].price * (product.discount / 100)
                  ).toLocaleString("fa-IR")}`
                )}
              </span>
              <span className="text-xs">تومان</span>
            </p>
          ) : null}

          {!product.discount ? (
            <p className="flex items-center gap-1">
              <span className="text-green-600 font-semibold">
                {En_To_Fa(`${product.images[0].price.toLocaleString("fa-IR")}`)}
              </span>
              <span className="text-xs">تومان</span>
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex items-center m-5 ml-3">
        <Image
          src={product.images[0].file}
          alt={product.name}
          width={200}
          height={200}
          className="max-w-[85px] sm:max-w-[110px] object-cover"
        />
      </div>

      {/* Product Discount  */}
      {product.discount && product.discount > 0 ? (
        <div className="absolute left-0 top-0 bg-red-500 text-white py-1 px-3 rounded-br-lg rounded-tl-lg">
          {En_To_Fa(`${product.discount}`)} تخفیف
        </div>
      ) : null}

      {/* Button For Remove From Favorited Products  */}

      <button
        className="absolute left-2 top-1/2 bottom-1/2"
        onClick={() => {
          setShowConfirmModal(true);
        }}
      >
        <BiTrash size={18} />
      </button>

      {/* Button For Go To Detail Page  */}
      <button
        className="absolute left-5 -bottom-5 bg-slate-600 text-white text-sm xl:text-base rounded-lg px-3 py-2"
        onClick={() => router.push(`/product/${product._id}`)}
      >
        مشاهده محصول
      </button>
      {showConfirmModal && (
        <ConfirmModal
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          product={product}
        />
      )}
    </div>
  );
};

export default FavoriteProductItem;
