"use client";

import { useCategoryStore, useCompareProductStore } from "@/store/store";
import { useEffect } from "react";
import CompareProductList from "@/components/Compare/CompareProductList";
import GeneralProductSpecifications from "@/components/Compare/GeneralProductSpecifications/GeneralProductSpecifications";

const CompareProductsScreen = () => {
  const { compareProducts } = useCompareProductStore((state) => state);
  const { fetchCategory, category } = useCategoryStore((state) => state);

  useEffect(() => {
    if (compareProducts.length > 0) {
      fetchCategory(compareProducts[0].category);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full p-2 2xl:p-5">
      {/* Title  */}
      <h2 className="text-lg font-semibold px-3">مقایسه {category?.name}</h2>

      {/* ComparedProductList */}
      <CompareProductList
        compareProducts={compareProducts}
        category={category}
      />

      {compareProducts.length > 0 && <GeneralProductSpecifications />}
    </div>
  );
};

export default CompareProductsScreen;
