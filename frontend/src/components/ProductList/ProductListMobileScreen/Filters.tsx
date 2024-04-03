import FilterByBrand from "@/screens/ProductListPage/Filters/FilterByBrand";
import FilterByColor from "@/screens/ProductListPage/Filters/FilterByColor";
import FilterByPrice from "@/screens/ProductListPage/Filters/FilterByPrice";
import { useFilterStore, useProductStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface IProps {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
}

const Filters: FC<IProps> = ({ showFilters, setShowFilters }) => {
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

  const handleRemoveAllFilters = () => {
    setFilters({ brand: null, color: null, pfrom: null, pto: null });
    router.push(pathname);
    setShowFilters(false);
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
    <section className="fixed inset-0 bg-white flex flex-col gap-5 overflow-y-auto pb-20">
      <div className="flex justify-between items-center border-b p-5">
        <div className="flex items-center gap-2">
          <FaFilter />
          <span>فیلترها</span>
        </div>
        <button onClick={() => setShowFilters(false)}>
          <IoClose size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-5 mx-5">
        {/* Filter By Price  */}
        <FilterByPrice />

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
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-white flex justify-between gap-2 border-t shadow-3xl px-5 py-3">
        <button
          className="bg-blue-600 text-white flex-1 py-2.5 rounded-md"
          onClick={() => setShowFilters(false)}
        >
          مشاهده {En_To_Fa(`${filteredProducts?.length}`)} محصول
        </button>
        <button
          className="text-red-600 border border-red-600 rounded-md flex-1 py-2.5"
          onClick={handleRemoveAllFilters}
        >
          حذف فیلتر
        </button>
      </div>
    </section>
  );
};

export default Filters;
