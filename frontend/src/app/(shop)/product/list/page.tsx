"use client";

import ProductList from "@/screens/ProductListPage/ProductListScreen";
import ProductListMobileScreen from "@/screens/ProductListPage/ProductListMobileScreen";
import { useProductStore } from "@/store/store";
import { useEffect } from "react";

const ProductListPage = () => {
  const { products, fetchProducts } = useProductStore((state) => state);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ProductList products={products} />
      <ProductListMobileScreen products={products} />
    </>
  );
};

export default ProductListPage;
