import { useProductStore } from "@/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FilterByPrice = () => {
  const [value, setValue] = useState<number[]>([0, 0]);
  const [show, setShow] = useState(false);

  const { products, fetchProducts, filteredProducts, setFilteredProducts } =
    useProductStore((state) => state);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const images = products.map((product) => product.images).flat();
  const prices = images.map((item) => item.price);
  const maxPrice = Math.max(...prices);

  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);

      const ptoValue = newValue[1]; // value[1] for pto
      const pfromValue = newValue[0]; // value[0] for pfrom

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("pto", String(ptoValue));
      newSearchParams.set("pfrom", String(pfromValue));

      router.push(`${pathname}?${newSearchParams.toString()}`);
    } else {
      setValue([newValue, newValue]);
    }
  };

  const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue([+newValue, value[0]]);
  };

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue([value[1], +newValue]);
  };

  useEffect(() => {
    const pto = searchParams.get("pto");
    const pfrom = searchParams.get("pfrom");
    if (pto && pfrom) {
      setValue([+pfrom, +pto]);
    } else {
      setValue([0, maxPrice]);
    }
  }, [searchParams, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <button
        className="flex justify-between px-3"
        onClick={() => setShow(!show)}
      >
        <span>فیلتر براساس قیمت</span>
        {show ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
      </button>
      {show && (
        <section className="flex flex-col gap-2">
          <div className="px-5">
            <Slider
              range
              min={0}
              max={maxPrice}
              value={value}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center text-xs px-3">
            <span>گرانترین</span>
            <span>ارزانترین</span>
          </div>

          <div className="flex flex-col gap-3 p-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <p>محدوده قیمت از</p>
                <div className="flex justify-between items-center border rounded-lg p-2">
                  <input
                    type="text"
                    value={value[0] || 0}
                    onChange={handleMinValueChange}
                    className="outline-none flex-1 p-1"
                  />
                  <span className="text-gray-400 text-xs">تومان</span>
                </div>
                <p>محدوده قیمت تا</p>
                <div className="flex justify-between items-center border rounded-lg p-2">
                  <input
                    type="text"
                    value={value[1] || 0}
                    onChange={handleMaxValueChange}
                    className="outline-none flex-1 p-1"
                  />
                  <span className="text-gray-400 text-xs">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FilterByPrice;
