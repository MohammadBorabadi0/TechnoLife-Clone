import {
  useBrandStore,
  useCategoryStore,
  useProductStore,
} from "@/store/store";
import { findBrandFromURL, findCategoryFromURL } from "@/utils/functions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const PageHero = () => {
  const { categories } = useCategoryStore((state) => state);
  const { brands } = useBrandStore((state) => state);
  const { product, fetchProduct, setProduct } = useProductStore(
    (state) => state
  );

  const { list, productId } = useParams();

  let decodedUrl = "";
  let brand;
  let category;

  if (list) decodedUrl = decodeURIComponent(list.toString());

  category =
    findCategoryFromURL(decodedUrl, categories) ||
    categories.find((category) => category._id === product?.category);
  brand =
    findBrandFromURL(decodedUrl, brands) ||
    brands.find((brand) => brand._id === product?.brand);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId.toString());
    } else {
      setProduct(null);
    }
  }, [productId]);

  return (
    <div className="flex flex-col gap-5 text-xs">
      <h3 className="whitespace-nowrap">
        <Link href="/">صفحه اصلی</Link>
        {category && `/ ${category.name}`}
        {brand && `/ ${brand.name}`} {product && `/ ${product.name}`}
      </h3>
      <span className="border-y py-[2px] block"></span>
    </div>
  );
};

export default PageHero;
