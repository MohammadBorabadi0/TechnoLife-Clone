import {
  useBrandStore,
  useCategoryStore,
  useProductStore,
} from "@/store/store";
import { IBrand } from "@/utils/type";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { FC, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface IProps {
  createQueryString: (name: string, value: string) => string;
  handleCheckBox: (brandName: string) => void;
}

const FilterByBrand: FC<IProps> = ({ createQueryString, handleCheckBox }) => {
  const [showBrands, setShowBrands] = useState(false);
  const [brandsExistInPage, setBrandsExistInPage] = useState<IBrand[]>([]);

  const { filteredProducts } = useProductStore((state) => state);
  const { brands, fetchBrands } = useBrandStore((state) => state);
  const { categories, fetchCategories } = useCategoryStore((state) => state);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { list } = useParams();

  const decodedUrl = decodeURIComponent(list.toString());
  const categoryName = decodedUrl.split("-")[1];

  // const brandsInCategory = categories.find(
  //   (cate) => cate.name === categoryName
  // )?.brand;

  // Assuming brands and categories are defined variables
  const findBrandsInCategory =
    categories.find((cate) => cate.name === categoryName)?.brand || [];

  const filteredBrands = brands.filter((brand) =>
    findBrandsInCategory.includes(brand._id as any)
  );

  useEffect(() => {
    const brandIdExistInPage = Array.from(
      new Set(filteredProducts?.map((product) => product.brand))
    );

    setBrandsExistInPage(
      brands.filter((brand) => brandIdExistInPage.includes(brand._id))
    );
  }, [brands]);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2 px-3">
      <button
        className="flex justify-between"
        onClick={() => setShowBrands(!showBrands)}
      >
        <span>برندها</span>
        {showBrands ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
      </button>
      {showBrands && (
        <ul>
          {filteredBrands.map((brand, index) => (
            <li
              key={index}
              className="flex items-center gap-2 px-1 py-2 cursor-default"
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("brand", brand.name)
                );
              }}
            >
              <input
                type="checkbox"
                id={brand._id}
                checked={
                  searchParams.get("brand")?.includes(brand.name) || false
                }
                onChange={() => handleCheckBox(brand.name)}
                className="w-4 h-4 border-2"
              />
              <label htmlFor={brand._id}></label>
              {brand.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterByBrand;
