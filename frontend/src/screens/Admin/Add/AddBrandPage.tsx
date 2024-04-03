"use client";

import { FormEvent, useEffect, useState } from "react";
import { useBrandStore, useCategoryStore } from "../../../store/store";
import { useRouter } from "next/navigation";
import Title from "../../../components/Admin/Title";
import CategoryMultipleSelect from "../../../components/Admin/select/CategorySelect";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

const AddBrandPage = () => {
  const { categories, fetchCategories } = useCategoryStore((state) => state);
  const { addBrand, brands } = useBrandStore((state) => state);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (name.trim() === "" || category.length === 0) {
      alert("نام برند و دسته بندی نمی توانند خالی باشند");
      return;
    }

    const existsBrand = brands.find((brand) => brand.name === name);

    // const existsBrand = brands.find((brand) => brand.name === name);

    if (existsBrand) {
      toast.error("برند با این نام از قبل وجود دارد");
      return;
    }

    addBrand(name, category);
    router.push("/admin/brands");
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="bg-white shadow-sm border rounded">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-8">
        <Title link="/admin/categories" title="افزودن برند" />
        <div className="flex gap-3">
          <TextField
            required
            label="نام برند"
            color="secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CategoryMultipleSelect
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-1.5 rounded w-fit"
          >
            ایجاد برند
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddBrandPage;
