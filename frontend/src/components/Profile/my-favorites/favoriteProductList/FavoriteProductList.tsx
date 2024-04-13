import { FC } from "react";
import { ProductData } from "@/utils/type";
import FavoriteProductItem from "./FavoriteProductItem";

interface IProps {
  favoriteProducts: ProductData[];
}

const FavoriteProductList: FC<IProps> = ({ favoriteProducts }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-12 my-7">
      {favoriteProducts.map((product) => (
        <FavoriteProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FavoriteProductList;
