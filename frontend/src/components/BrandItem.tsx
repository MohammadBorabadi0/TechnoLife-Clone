import { FC, useEffect } from "react";
import { ICategory } from "../utils/type";
import { useBrandStore } from "../store/store";

interface IProps {
  category: ICategory;
}

const BrandItem: FC<IProps> = ({ category }) => {
  const { brands, fetchBrands } = useBrandStore((state) => state);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <div>
      {category.brand.map((item) =>
        brands
          .filter((i) => i._id === item)
          .map((b) => <h2 key={b._id}>{b.name}</h2>)
      )}

      {/* {category.brand.map((item: Item) => (
        <h2 key={item}>{item}</h2>
      ))} */}
    </div>
  );
};

export default BrandItem;
