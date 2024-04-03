"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { IoClose, IoCloseSharp, IoFilter } from "react-icons/io5";
import { En_To_Fa } from "@/utils/functions";
import PageHero from "@/components/PageHero";
import Filters from "./Filters2";
import ProductList from "./ProductList";
import { FiFilter } from "react-icons/fi";
import { ProductData } from "@/utils/type";
import { useCompareProductStore, useProductStore } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface IProps {
  products: ProductData[];
}

const ProductListScreen: FC<IProps> = ({ products }) => {
  const [showFilters, setShowFilters] = useState(true);

  const {
    showCompareProducts,
    setShowCompareProducts,
    compareProducts,
    removeFromCompareProducts,
    removeAllCompareProducts,
  } = useCompareProductStore((state) => state);
  const { filteredProducts, setFilteredProducts } = useProductStore(
    (state) => state
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCreateQuery = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (value === "asc" && newSearchParams.get("sort") === "asc") {
        newSearchParams.delete("sort");
      } else if (value === "desc" && newSearchParams.get("sort") === "desc") {
        newSearchParams.delete("sort");
      } else if (
        value === "date-desc" &&
        newSearchParams.get("sort") === "date-desc"
      ) {
        newSearchParams.delete("sort");
      } else if (
        value === "discount-desc" &&
        newSearchParams.get("sort") === "discount-desc"
      ) {
        newSearchParams.delete("sort");
      } else {
        newSearchParams.set(name, value);
      }

      window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    },
    [searchParams]
  );

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (filteredProducts) {
      if (sort === "asc") {
        setFilteredProducts(
          filteredProducts.sort((a, b) => a.images[0].price - b.images[0].price)
        );
      } else if (sort === "desc") {
        setFilteredProducts(
          filteredProducts.sort((a, b) => b.images[0].price - a.images[0].price)
        );
      } else if (sort === "date-desc") {
        setFilteredProducts(
          filteredProducts.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
            return 0;
          })
        );
      } else if (sort === "discount-desc") {
        setFilteredProducts(
          filteredProducts.sort((a, b) => {
            const discountA = a.discount || 0;
            const discountB = b.discount || 0;
            return discountB - discountA;
          })
        );
      } else {
        setFilteredProducts(
          filteredProducts.sort((a, b) => {
            const orderCountA = a.orderCount || 0;
            const orderCountB = b.orderCount || 0;
            return orderCountB - orderCountA;
          })
        );
      }
    }
  }, [searchParams, filteredProducts]);

  return (
    <div className="hidden lg:flex flex-col gap-8 py-6 px-8 text-xs">
      {/* Page Hero  */}
      <PageHero />

      {/* Main Product  List  */}
      <section className="flex gap-6 min-h-screen">
        {/* Filter Section  */}
        {showFilters && <Filters setShowFilters={setShowFilters} />}

        <div className="flex flex-col gap-6 flex-1 h-fit">
          <div className="flex items-start flex-1">
            {!showFilters ? (
              <div>
                <button
                  className="flex items-center justify-center gap-1 text-black text-sm h-14 ml-3 px-5 bg-gray-100 border border-slate-500 rounded-lg"
                  onClick={() => setShowFilters(true)}
                >
                  <FiFilter />
                  <span>فیلترها</span>
                </button>
              </div>
            ) : null}

            <div className="flex items-start justify-between gap-8 bg-blue-50 flex-1 px-4 rounded-lg h-14">
              <div className="flex gap-8">
                <div className="flex items-center gap-2 text-black">
                  <IoFilter />
                  <span className="font-semibold">ترتیب:</span>
                </div>
                <ul className="flex gap-5">
                  <li>
                    <button
                      className={`${
                        searchParams.get("sort") === "order-desc" ||
                        searchParams.get("sort") === null
                          ? "font-semibold text-blue-600"
                          : ""
                      } py-5`}
                      onClick={() => handleCreateQuery("sort", "order-desc")}
                    >
                      پرفروش ترین
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${
                        searchParams.get("sort") === "desc"
                          ? "font-semibold text-blue-600"
                          : ""
                      } py-5`}
                      onClick={() => handleCreateQuery("sort", "desc")}
                    >
                      بیشترین قیمت
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${
                        searchParams.get("sort") === "asc"
                          ? "font-semibold text-blue-600"
                          : ""
                      } py-5`}
                      onClick={() => handleCreateQuery("sort", "asc")}
                    >
                      کمترین قیمت
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${
                        searchParams.get("sort") === "date-desc"
                          ? "font-semibold text-blue-600"
                          : ""
                      } py-5`}
                      onClick={() => handleCreateQuery("sort", "date-desc")}
                    >
                      جدیدترین
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${
                        searchParams.get("sort") === "discount-desc"
                          ? "font-semibold text-blue-600"
                          : ""
                      } py-5`}
                      onClick={() => handleCreateQuery("sort", "discount-desc")}
                    >
                      بیشترین تخفیف
                    </button>
                  </li>
                </ul>
              </div>
              <span className="block py-5">
                {En_To_Fa(`${products?.length}`)} کالا
              </span>
            </div>

            {/* Compare Products  */}
            {compareProducts.length > 0 ? (
              <div className="flex items-center gap-4 mr-6">
                {compareProducts.map((product) => (
                  <div
                    key={product._id}
                    className="relative flex justify-center items-center h-14 w-14 rounded-md shadow-3xl"
                  >
                    <Image
                      src={product.images[0].file}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-12 h-12 object-cover"
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

            {!showCompareProducts ? (
              <button
                className="bg-blue-600 text-white rounded-lg px-5 h-14 mr-3"
                onClick={() => setShowCompareProducts(true)}
              >
                مقایسه
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-blue-600 text-white rounded-lg px-4 h-14 mr-3">
                <button
                  onClick={() => {
                    setShowCompareProducts(false);
                    removeAllCompareProducts();
                  }}
                >
                  <IoCloseSharp className="text-xl" />
                </button>
                <div className="h-6 w-[1px] bg-white"></div>
                <button
                  className="flex items-center gap-2 h-14"
                  onClick={() => {
                    compareProducts.length > 0 && router.push("/compare");
                  }}
                >
                  <p>شروع مقایسه</p>
                  <div className="flex items-center justify-center text-base font-semibold bg-white text-black w-6 h-6 rounded-md">
                    <span>{En_To_Fa(`${compareProducts.length}`)}</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Product List  */}
          <ProductList products={products} showFilters={showFilters} />
        </div>
      </section>
    </div>
  );
};

export default ProductListScreen;
