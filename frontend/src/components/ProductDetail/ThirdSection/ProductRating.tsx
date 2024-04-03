// Utils
import { En_To_Fa } from "@/utils/functions";

// Icons
import Rating from "../Rating";
import { ProductData } from "@/utils/type";
import { FC } from "react";

interface IProps {
  product: ProductData;
}

const ProductRating: FC<IProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-end text-black gap-3 px-4 md:pl-0">
      <div className="flex justify-end items-center w-full">
        <span className="text-3xl font-bold">
          {En_To_Fa(
            `${
              product.rating && product.rating > 0
                ? product.rating.toFixed(2)
                : "0.0"
            }`
          )}
        </span>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span>{En_To_Fa(`${product.reviews?.length || 0} نظر`)}</span>
        <div className="flex text-xl text-orange-500">
          <Rating rating={product.rating!} />
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
