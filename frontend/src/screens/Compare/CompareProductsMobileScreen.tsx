"use client";

import CompareProductList from "@/components/Compare/CompareMobile/CompareProductList";
import GeneralProductSpecifications from "@/components/Compare/CompareMobile/GeneralProductSpecifications/GeneralProductSpecifications";
import { useCategoryStore, useCompareProductStore } from "@/store/store";
import { useEffect, useRef } from "react";

const CompareProductsMobileScreen = () => {
  const { compareProducts } = useCompareProductStore((state) => state);
  const { fetchCategory, category } = useCategoryStore((state) => state);

  const compareProductListRef = useRef<HTMLDivElement | null>(null);
  const generalSpecificationsRef = useRef<HTMLDivElement | null>(null);
  const compareHeaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (compareProducts.length > 0) {
      fetchCategory(compareProducts[0].category);
    }
  }, []);

  return (
    <div className="flex flex-col py-5 overflow-x-auto no-scrollbar">
      {/* Title  */}
      <h2 className="font-semibold text-black px-3">
        مقایسه {category?.name || "گوشی موبایل"}
      </h2>

      {/* ComparedProductList */}
      <CompareProductList
        compareProductListRef={compareProductListRef}
        compareProducts={compareProducts}
        category={category}
      />

      {compareProducts.length > 0 && (
        <GeneralProductSpecifications
          generalSpecificationsRef={generalSpecificationsRef}
          compareHeaderRef={compareHeaderRef}
        />
      )}
    </div>
  );
};

export default CompareProductsMobileScreen;
