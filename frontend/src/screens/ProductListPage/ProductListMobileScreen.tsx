import PageHero from "@/components/PageHero";
import { En_To_Fa, findCategoryFromURL } from "@/utils/functions";
import React, { FC, useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import ProductList from "./ProductList";
import {
  useBrandStore,
  useCategoryStore,
  useCompareProductStore,
  useModal,
  useProductStore,
} from "@/store/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ProductData } from "@/utils/type";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import Filters from "@/components/ProductList/ProductListMobileScreen/Filters";
import SortModal from "@/components/ProductList/ProductListMobileScreen/SortModal";
import { sortData } from "@/data/data";

interface IProps {
  products: ProductData[];
}

const ProductListMobileScreen: FC<IProps> = ({ products }) => {
  const [showFilters, setShowFilters] = useState(false);

  const { brands, fetchBrands } = useBrandStore((state) => state);
  const { categories, fetchCategories } = useCategoryStore((state) => state);
  const { showSortModal, setShowSortModal, activeSort, setActiveSort } =
    useModal((state) => state);
  const {
    compareProducts,
    showCompareProducts,
    setShowCompareProducts,
    removeAllCompareProducts,
    removeFromCompareProducts,
  } = useCompareProductStore((state) => state);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sort = searchParams.get("sort");
    const findSort = sortData.find((item) => item.query === sort);
    if (findSort) {
      setActiveSort(findSort.id, findSort.name);
    }
  }, [searchParams]);

  return (
    <div className="lg:hidden text-xs px-3 py-5">
      {showFilters ? (
        <Filters showFilters={showFilters} setShowFilters={setShowFilters} />
      ) : (
        <div>
          <PageHero />

          {/* Filter Section  */}
          <div className="flex items-center gap-2 sticky top-0 bg-white h-16 z-20">
            <div className="flex gap-5 h-10 rounded-lg my-5 px-2 bg-blue-50 flex-1">
              <button
                className="flex items-center gap-1"
                onClick={() => setShowFilters(true)}
              >
                <BiFilter size={17} />
                <span>فیلترها</span>
              </button>
              <button
                className="flex items-center gap-2"
                onClick={() => setShowSortModal(true)}
              >
                <FiFilter />
                <span className="hidden xs:block">ترتیب: </span>
                <span>{activeSort.name}</span>
              </button>
            </div>

            {/* ------------------------------------------------------------------- */}

            {!showCompareProducts ? (
              <button
                className="bg-blue-600 text-white rounded-lg h-10 px-2"
                onClick={() => setShowCompareProducts(true)}
              >
                مقایسه
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-blue-600 text-white text-[11px] rounded-lg px-2 h-10">
                <button
                  onClick={() => {
                    setShowCompareProducts(false);
                    removeAllCompareProducts();
                  }}
                >
                  <IoCloseSharp className="text-base" />
                </button>
                <div className="h-5 w-[.5px] bg-white"></div>
                <button
                  className="flex items-center gap-2 h-10"
                  onClick={() => {
                    compareProducts.length > 0 && router.push("/compare");
                  }}
                >
                  <p>مقایسه</p>
                  <div className="flex items-center justify-center font-semibold bg-white text-black w-4 h-4 rounded-sm">
                    <span className="pt-0.5">
                      {En_To_Fa(`${compareProducts.length}`)}
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* ------------------------------------------------------------------- */}
          </div>

          <div className="flex justify-between mb-5">
            <div className="flex gap-1 mb-4">
              <span>تعداد محصولات : </span>
              <p className="flex gap-1 font-semibold">
                <span>{En_To_Fa(`${products.length}`)}</span>
                <span>کالا</span>
              </p>
            </div>
            {/* Compare Products  */}
            {compareProducts.length > 0 ? (
              <div className="flex items-center gap-4 mr-6">
                {compareProducts.map((product) => (
                  <div
                    key={product._id}
                    className="relative flex justify-center items-center h-10 w-10 rounded-md shadow-3xl"
                  >
                    <Image
                      src={product.images[0].file}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-9 h-9 object-cover"
                    />
                    <button
                      className="absolute -top-1 -right-2 bg-blue-600 text-white p-0.5 rounded-md"
                      onClick={() => removeFromCompareProducts(product._id!)}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Product List Section  */}
          <ProductList products={products} />
        </div>
      )}
      {showSortModal && <SortModal />}
    </div>
  );
};

export default ProductListMobileScreen;
