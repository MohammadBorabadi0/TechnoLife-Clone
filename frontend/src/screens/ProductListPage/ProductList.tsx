import ProductCard from "@/components/ProductList/ProductCard";
import ProductCardMobile from "@/components/ProductList/ProductListMobileScreen/ProductCardMobile";

import { ProductData } from "@/utils/type";
import { FC, Fragment } from "react";

interface IProps {
  showFilters?: boolean;
  products: ProductData[];
}

const ProductList: FC<IProps> = ({ showFilters, products }) => {
  if (!products) {
    return (
      <div>
        <p>هیچ محصولی وجود ندارد</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ${
        !showFilters && "lg:grid-cols-4 xl:grid-cols-5"
      } gap-5 sm:gap-2`}
    >
      {products.map((product) => (
        <Fragment key={product._id}>
          <ProductCard product={product} />
          <ProductCardMobile product={product} />
        </Fragment>
      ))}
    </div>
  );
};

export default ProductList;
