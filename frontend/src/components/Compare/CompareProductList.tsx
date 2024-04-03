import { ICategory, ProductData } from "@/utils/type";
import { FC } from "react";
import CompareProductItem from "./CompareProductItem";
import AddToCompareProduct from "./AddToCompareProduct";

interface IProps {
  compareProducts: ProductData[];
  category: ICategory | null;
}

const CompareProductList: FC<IProps> = ({ compareProducts, category }) => {
  return (
    <div className="flex xl:grid xl:grid-cols-4 gap-3 xl:gap-10 border-2 border-gray-200 rounded-2xl sm:p-3 xl:p-6 2xl:p-8">
      {compareProducts.length > 0 &&
        compareProducts.map((product) => (
          <CompareProductItem product={product} category={category} />
        ))}
      {compareProducts.length < 4 && (
        <AddToCompareProduct category={category} />
      )}
    </div>
  );
};

export default CompareProductList;
