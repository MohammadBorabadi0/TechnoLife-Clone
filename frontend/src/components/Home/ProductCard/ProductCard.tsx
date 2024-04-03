import { FC } from "react";
import ProductPrice from "../ProductList/ProductPrice";
import Timer from "../Timer";
import { ProductData } from "@/utils/type";
import Link from "next/link";

interface IProps {
  product: ProductData;
}

const ProductCard: FC<IProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-6 items-center border-l w-full h-96 text-sm relative">
      {/* Product Timer Discount  */}
      <div className="flex justify-center w-[90%]">
        <Timer hours={product.discountTime || 0} product={product} />
      </div>

      <Link href={`/product/${product._id}`}>
        <img
          src={product.images[0]?.file}
          alt={product.name}
          className="w-44 h-44 object-cover"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col gap-8 px-5 text-xs md:text-sm">
        <Link href={`/product/${product._id}`}>
          <h4 className="line-clamp-2 font-medium">{product.name}</h4>
        </Link>
        <ProductPrice product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
