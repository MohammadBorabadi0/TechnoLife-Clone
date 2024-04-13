import {
  useBrandStore,
  useCategoryStore,
  useFilterStore,
  useProductStore,
} from "@/store/store";
import { IBrand } from "@/utils/type";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaFilter } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import ShowActiveFilters from "./Filters/ShowActiveFilters";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByBrand from "./Filters/FilterByBrand";
import FilterByColor from "./Filters/FilterByColor";

interface IProps {
  setShowFilters: Dispatch<SetStateAction<boolean>>;
}

const ProductFilter: FC<IProps> = ({ setShowFilters }) => {
  const { filters, setFilters } = useFilterStore((state) => state);
  const { filteredProducts, setFilteredProducts } = useProductStore(
    (state) => state
  );

  // -------------------------------------------

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const color = searchParams.get("color");
  const pto = searchParams.get("pto");
  const pfrom = searchParams.get("pfrom");

  const { list } = useParams();
  const decodedUrl = decodeURIComponent(list.toString());

  // ------------------------------------------------------------------

  const createQueryString = useCallback((name: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has(name)) {
      searchParams.set(name, value);
    } else {
      const paramValue = searchParams.get(name);
      if (paramValue === value) {
        searchParams.delete(name);
      } else if (paramValue?.includes(value)) {
        const updatedValue = paramValue
          .split("_")
          .filter((item) => item !== value)
          .join("_");
        searchParams.set(name, updatedValue);
      } else if (!paramValue?.includes(value)) {
        searchParams.set(name, `${paramValue}_${value}`);
      }
    }

    return searchParams.toString();
  }, []);

  const handleCheckBox = useCallback((brandName: string) => {
    const updatedBrand = filters.brand ? filters.brand.split("_") : [];

    if (updatedBrand.includes(brandName)) {
      if (updatedBrand.length === 1) {
        filters.brand = "";
      } else {
        updatedBrand.splice(updatedBrand.indexOf(brandName), 1);
        filters.brand = updatedBrand.join("_");
      }
    } else {
      updatedBrand.push(brandName);
      filters.brand = updatedBrand.join("_");
    }
  }, []);

  const handleRemoveFromFilters = (itemToRemove: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    if (brand) {
      const brandItems = brand.split("_");

      const updatedBrand = brandItems
        .filter((item) => item !== itemToRemove)
        .join("_");

      if (updatedBrand) {
        updatedSearchParams.set("brand", updatedBrand);
      } else {
        updatedSearchParams.delete("brand");
      }

      router.push(
        `${pathname}${
          updatedSearchParams.toString()
            ? `?${updatedSearchParams.toString()}`
            : ""
        }`
      );
    }
  };

  useEffect(() => {
    setFilters({
      brand,
      color,
      pto,
      pfrom,
    });
  }, [searchParams]);

  return (
    <div
      className={`border rounded-lg sticky top-[110px] w-[264px] h-fit py-3`}
    >
      <div className="flex flex-col rounded-md">
        <div className="flex justify-between items-center border-b p-4">
          <span className="flex items-center gap-1 font-semibold text-sm">
            <FaFilter />
            <span>فیلترها</span>
          </span>
          <button
            className="flex items-center font-semibold text-xl text-blue-600"
            onClick={() => setShowFilters(false)}
          >
            <span>
              <FiChevronRight />
            </span>
            <span className="-mr-1">|</span>
          </button>
        </div>

        {/* Show Active Filters */}
        <ShowActiveFilters handleRemoveFromFilters={handleRemoveFromFilters} />

        <section className="flex flex-col gap-7 pt-5 pb-10 scrollbar text-sm">
          {/* Filter By Price  */}
          <FilterByPrice />

          {JSON.stringify(decodedUrl)}

          {/* Filter By Brand  */}
          {decodedUrl.includes("تمامی") && (
            <FilterByBrand
              createQueryString={createQueryString}
              handleCheckBox={handleCheckBox}
            />
          )}

          <FilterByColor
            createQueryString={createQueryString}
            handleCheckBox={handleCheckBox}
          />
        </section>
      </div>
    </div>
  );
};

export default ProductFilter;
