"use client";
import { useEffect } from "react";

// components 
import TableComponent from "@/components/Admin/tables/CategoriesAndBrandsTable/TableComponent";

// store 
import { useBrandStore } from "@/store/store";


const BrandListScreen = () => {
  const { brands, fetchBrands, deleteBrand } = useBrandStore((state) => state);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <TableComponent
      data={brands}
      deleteRow={deleteBrand}
      title="برندها"
      url="/admin/add-brand"
      linkRouter="/admin/edit-brand"
    />
  );
};

export default BrandListScreen;
