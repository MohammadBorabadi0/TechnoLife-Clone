import { ICategory, ProductData } from "@/utils/type";
import { FC, MutableRefObject } from "react";
import CompareProductItem from "./CompareProductItem";
import AddToCompareProduct from "./AddToCompareProduct";

interface IProps {
  compareProducts: ProductData[];
  category: ICategory | null;
  compareProductListRef: MutableRefObject<HTMLDivElement | null>;
}

const CompareProductList: FC<IProps> = ({
  compareProducts,
  category,
  compareProductListRef,
}) => {
  if (compareProducts.length === 0) {
    return (
      <div>
        <AddToCompareProduct
          compareProducts={compareProducts}
          category={category}
        />
      </div>
    );
  }

  return (
    <div
      className="flex py-5 border-gray-200 min-w-[1000px]"
      ref={compareProductListRef}
    >
      {compareProducts.length > 0 &&
        compareProducts.map((product) => (
          <CompareProductItem product={product} category={category} />
        ))}
      {compareProducts.length < 4 && (
        <AddToCompareProduct
          compareProducts={compareProducts}
          category={category}
        />
      )}
    </div>
  );
};

export default CompareProductList;
