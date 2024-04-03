"use client";

import { FormEvent, useEffect, useState } from "react";
import { useBrandStore, useCategoryStore } from "../../../store/store";
import Title from "../../../components/Admin/Title";
import MultipleSelect from "../../../components/Admin/select/CategorySelect";
import { TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

const EditBrandScreen = () => {
  const { categories, fetchCategories, category, fetchCategory } =
    useCategoryStore((state) => state);
  const { updateBrand, fetchBrand, brand } = useBrandStore((state) => state);

  console.log({ categories });
  console.log({ brand });

  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();
  const { brandId } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (name.trim() === "" || categoryName.trim() === "") {
      alert("نام برند و دسته بندی نمی توانند خالی باشند");
      return;
    }

    if (brandId) updateBrand(brandId.toString(), name, categoryName);
    router.push("/admin/brands");
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    category && setCategoryName(category._id);
  }, [category]);

  useEffect(() => {
    if (brand) setName(brand.name);
  }, [brand]);

  useEffect(() => {
    fetchBrand(brandId.toString());
  }, [fetchBrand, brandId]);

  useEffect(() => {
    if (brand) fetchCategory(brand.category);
  }, [fetchCategory, brand]);

  return (
    <section className="flex flex-col w-full gap-5 bg-white px-6 pt-10 pb-20 rounded-md shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Title link="/admin/brands" title="ویرایش برند" />
        <div className="flex items-center gap-3 w-full">
          <TextField
            required
            label="نام برند"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MultipleSelect
            category={categoryName}
            setCategory={setCategoryName}
            categories={categories}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-3.5 rounded"
          >
            ویرایش برند
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditBrandScreen;
