import {
  useBrandStore,
  useCategoryStore,
} from "@/store/store";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { BiChevronLeft } from "react-icons/bi";

interface IProps {
  categoryName: string;
}

const MobileContent: FC<IProps> = ({ categoryName }) => {
  const { brands, fetchBrands } = useBrandStore((state) => state);
  const { categories, fetchCategories } = useCategoryStore((state) => state);

  const findCategory = categories.find(
    (category) => category.name === categoryName
  );

  const brandList = findCategory?.brand;

  const filteredBrands = brands.filter((brand:any) =>
    brandList?.includes(brand._id)
  );

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  return (
    <div className="text-xs">
      {/* Title  */}
      <div className="flex items-center gap-1">
        <Link
          href={`/product/list/تمامی-${categoryName}-ها`}
          className="text-sm"
        >
          قیمت {categoryName}
        </Link>{" "}
        <span>(همه محصولات)</span>
        <BiChevronLeft size={20} />
      </div>

      {/* Brand Items  */}
      <ul className="mt-5 flex flex-col gap-3">
        {filteredBrands?.map((brand) => (
          <li key={brand._id}>
            <Link href={`/product/list/${categoryName}-${brand.name}`}>
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileContent;
