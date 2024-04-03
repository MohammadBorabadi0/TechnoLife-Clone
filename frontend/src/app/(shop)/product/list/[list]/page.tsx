"use client";

import ProductList from "@/screens/ProductListPage/ProductListScreen";
import ProductListMobileScreen from "@/screens/ProductListPage/ProductListMobileScreen";
import { useParams, useSearchParams } from "next/navigation";
import {
  useBrandStore,
  useCategoryStore,
  useColorStore,
  useProductStore,
} from "@/store/store";
import { useEffect } from "react";

const ProductListPage = () => {
  const { products, fetchProducts, filteredProducts, setFilteredProducts } =
    useProductStore((state) => state);

  const { categories, fetchCategories } = useCategoryStore((state) => state);
  const { colors, fetchColors } = useColorStore((state) => state);
  const { brands, fetchBrands } = useBrandStore((state) => state);

  const { list } = useParams();
  const searchParams = useSearchParams();
  const decodedUrl = decodeURIComponent(list.toString());

  // Find And Brand & Category From searchParams and Database
  let findBrand: any;
  let findCategory: any;

  // useEffect For set FitleredProducts
  useEffect(() => {
    setFilteredProducts(products);
  }, [products, fetchProducts]);

  // useEffect For handle Filter By Brand and Color
  useEffect(() => {
    if (decodedUrl.includes("تمامی")) {
      findCategory = categories.find(
        (category) => category.name === decodedUrl.split("-")[1]
      );
    } else {
      findBrand = brands.find(
        (brand) => brand.name === decodedUrl.split("-")[1]
      );
      findCategory = categories.find(
        (category) => category.name === decodedUrl.split("-")[0]
      );
    }

    // Set Filtered Products Using useParams
    setFilteredProducts(
      products.filter((product) => {
        if (findBrand) {
          return (
            product.brand === findBrand._id &&
            product.category === findCategory._id
          );
        } else {
          return product.category === findCategory._id;
        }
      })
    );

    // Set Filtered Products Using SearchParams
    const brand = searchParams.get("brand");
    const color = searchParams.get("color");
    const pto = searchParams.get("pto");
    const pfrom = searchParams.get("pfrom");

    // -----------------------------------------------------------------------

    // IF Brand is Exists In searchParams and Color is Not Exists
    if (brand && !color) {
      const splitedBrands = brand.split("_");
      const filteredBrands = brands.filter((brand) =>
        splitedBrands.includes(brand.name)
      );

      if (filteredProducts)
        setFilteredProducts(
          products.filter((product) =>
            filteredBrands.some(
              (brand) =>
                brand._id === product.brand &&
                product.category === findCategory._id
            )
          )
        );
    }

    // -----------------------------------------------------------------------

    // IF Brand And Color is Exists In searchParams
    if (brand && color) {
      const splitedBrands = brand.split("_");
      const filteredBrands = brands.filter((brand) =>
        splitedBrands.includes(brand.name)
      );

      const splitedColors = color.split("_");
      const filteredColors = colors.filter((color) =>
        splitedColors.includes(color.name)
      );

      if (filteredProducts) {
        setFilteredProducts(
          products.filter((product) => {
            return product.images.some(
              (image) =>
                filteredColors.some((color) => color._id === image.color) &&
                product.category === findCategory._id &&
                filteredBrands.some(
                  (brand) =>
                    brand._id === product.brand &&
                    product.category === findCategory._id
                )
            );
          })
        );
      }
    }

    // -----------------------------------------------------------------------

    // IF Color is Exists In searchParams and Brand is Not Exists
    if (color && !brand) {
      const splitedColors = color.split("_");
      const filteredColors = colors.filter((color) =>
        splitedColors.includes(color.name)
      );

      if (filteredProducts) {
        setFilteredProducts(
          products.filter((product) => {
            return product.images.some(
              (image) =>
                filteredColors.some((color) => color._id === image.color) &&
                product.category === findCategory._id
            );
          })
        );
      }
    }

    // -------------------------------------------------------------------------------------

    // IF Pto & Pfrom & Brand is True

    if (pto && pfrom && !(brand && color)) {
      setFilteredProducts(
        products.filter((product) =>
          product.images.some(
            (item) =>
              item.price >= +pfrom &&
              item.price <= +pto &&
              product.category === findCategory._id
          )
        )
      );
    }

    if (pto && pfrom && brand && !color) {
      const splitedBrands = brand.split("_");
      const filteredBrands = brands.filter((brand) =>
        splitedBrands.includes(brand.name)
      );
      setFilteredProducts(
        products.filter((product) =>
          product.images.some(
            (item) =>
              item.price >= +pfrom &&
              item.price <= +pto &&
              product.category === findCategory._id &&
              filteredBrands.some(
                (brand) =>
                  brand._id === product.brand &&
                  product.category === findCategory._id
              )
          )
        )
      );
    }

    // IF Pto & Pfrom & Color is True

    if (pto && pfrom && !brand && color) {
      const splitedColors = color.split("_");
      const filteredColors = colors.filter((color) =>
        splitedColors.includes(color.name)
      );

      setFilteredProducts(
        products.filter((product) =>
          product.images.some(
            (item) =>
              item.price >= +pfrom &&
              item.price <= +pto &&
              product.category === findCategory._id &&
              filteredColors.some(
                (color) =>
                  color._id === item.color &&
                  product.category === findCategory._id
              )
          )
        )
      );
    }

    if (pto && pfrom && brand && color) {
      const splitedColors = color.split("_");
      const filteredColors = colors.filter((color) =>
        splitedColors.includes(color.name)
      );
      const splitedBrands = brand.split("_");
      const filteredBrands = brands.filter((brand) =>
        splitedBrands.includes(brand.name)
      );

      setFilteredProducts(
        products.filter((product) =>
          product.images.some(
            (item) =>
              item.price >= +pfrom &&
              item.price <= +pto &&
              filteredColors.some((color) => color._id === item.color) &&
              filteredBrands.some((brand) => brand._id === product.brand)
          )
        )
      );
    }
  }, [products, findCategory, findBrand, searchParams]);

  // Fetch Categories & Brands & Colors & Products From Database
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchColors();
    fetchProducts();
  }, []);

  return (
    <>
      <ProductList products={filteredProducts || []} />
      <ProductListMobileScreen products={filteredProducts || []} />
    </>
  );
};

export default ProductListPage;
