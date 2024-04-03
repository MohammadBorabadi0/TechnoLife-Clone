"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Title from "../../../components/Admin/Title";
import { useCategoryStore } from "../../../store/store";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

const AddCategory = () => {
  const { addCategory, categories } = useCategoryStore((state) => state);

  const [name, setName] = useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("نام دسته بندی نباید خالی باشد");
      return;
    }

    const existsCategory = categories.find(
      (category) => category.name === name
    );

    if (existsCategory) {
      toast.error("دسته بندی با این نام از قبل وجود دارد");
      return;
    }

    addCategory(name);
    toast.success("دسته بندی با موفقیت ایجاد شد.");
    router.push("/admin/categories");
  };

  return (
    <section className="bg-white shadow-sm border rounded">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-8">
        <Title link="/admin/categories" title="افزودن دسته بندی" />
        <div className="flex gap-3">
          <TextField
            required
            label="نام دسته بندی"
            color="secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-1.5 rounded w-fit"
          >
            ایجاد دسته بندی
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
