'use client';

import { useState, FormEvent, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Components 
import Title from "../../../components/Admin/Title";

// Store 
import { useCategoryStore } from "../../../store/store";

// Mui 
import { TextField } from "@mui/material";


const EditCategoryScreen = () => {
  const { category, fetchCategory, updateCategory } =
    useCategoryStore((state) => state);

  const [name, setName] = useState("");

  const router = useRouter();
  const { categoryId } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (categoryId) {
      updateCategory(categoryId.toString(), name);
      router.push("/admin/categories");
    }
  };

  useEffect(() => {
    if (categoryId) fetchCategory(categoryId.toString());
  }, [fetchCategory, categoryId]);

  useEffect(() => {
    if (category) setName(category.name);
  }, [category]);

  return (
    <section className="flex flex-col w-full gap-5 bg-white px-6 pt-10 pb-20 rounded-md shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Title link="/admin/categories" title="ویرایش دسته بندی" />
        <div className="flex gap-3">
          <TextField
            required
            label="نام دسته بندی"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-1.5 rounded w-fit"
          >
            ویرایش دسته بندی
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCategoryScreen;
