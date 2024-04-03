"use client";

import Accessories from "@/components/Home/AccessoriesSection/Accessories";
import Banners from "@/components/Home/Banners/Banners";
import Billboard from "@/components/Home/Billboard/Billboard";
import Categories from "@/components/Home/Categories/Categories";
import HeadPhoneSection from "@/components/Home/HeadphoneSection/HeadPhoneSection";
import HomeAppliances from "@/components/Home/HomeApplianceSection/HomeAppliances";
import LaptopSection from "@/components/Home/LaptopSection/LaptopSection";
import PopularMobiles from "@/components/Home/PopularCategories/PopularMobiles";
import ProductList from "@/components/Home/ProductList/ProductList";
import Tablets from "@/components/Home/TabletSection/Tablets";
import { useProductStore } from "@/store/store";
import { useEffect } from "react";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore((state) => state);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Billboard />
      <div className="flex flex-col gap-16 mx-3 mt-16 md:mx-5">
        <Categories />
        <ProductList products={products} />
        <Banners />
        <ProductList products={products} />
        <PopularMobiles />
        <LaptopSection />
        <ProductList products={products} />
        <PopularMobiles />
        <HeadPhoneSection />
        <Tablets />
        <HomeAppliances />
        <Accessories />
      </div>
    </div>
  );
};

export default HomePage;
