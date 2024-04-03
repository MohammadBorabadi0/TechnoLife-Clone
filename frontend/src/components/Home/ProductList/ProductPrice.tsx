import { ProductData } from "@/utils/type";
import { parse } from "persian_util";
import { FC } from "react";

interface IProps {
  product: ProductData;
}

const ProductPrice: FC<IProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-end gap-2 text-sm md:text-base font-semibold">
      {/* Product Price Discount  */}
      {product.discount ? (
        <div className="text-red-600 flex gap-1">
          <span>
            {parse.En_To_Fa(
              `${(
                product.images[0]?.price -
                product.images[0]?.price * (product.discount / 100)
              ).toLocaleString("fa-IR")}`
            )}
          </span>
          تومان
        </div>
      ) : null}

      {/* Product Price  */}
      <div className={`flex gap-1 ${product.discount && "text-gray-500"}`}>
        <span className={`${product.discount && "line-through"}`}>
          {parse.En_To_Fa(
            `${product.images[0]?.price.toLocaleString("fa-IR")}`
          )}
        </span>
        تومان
      </div>
    </div>
  );
};

export default ProductPrice;
