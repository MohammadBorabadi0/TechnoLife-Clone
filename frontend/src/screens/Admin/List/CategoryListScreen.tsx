"use client";

import TableComponent from "@/components/Admin/tables/CategoriesAndBrandsTable/TableComponent";
import { useCategoryStore } from "@/store/store";
import { useEffect } from "react";

const CategoryListScreen = () => {
  const { categories, fetchCategories, deleteCategory } = useCategoryStore(
    (state) => state
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <TableComponent
      data={categories}
      deleteRow={deleteCategory}
      title="دسته بندی ها"
      url="/admin/add-category"
      linkRouter="/admin/edit-category"
    />
  );
};

export default CategoryListScreen;
