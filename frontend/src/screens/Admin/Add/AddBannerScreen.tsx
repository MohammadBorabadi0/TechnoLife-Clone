"use client";

import Input from "@/components/Admin/add/Input";
import { useBannerStore } from "@/store/store";
import { ChangeEvent, FormEvent } from "react";

import toast from "react-hot-toast";

const AddBannerScreen = () => {
  const { label, image, setLabel, setImage, createBanner } = useBannerStore(
    (state) => state
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "label") {
      setLabel(value);
    } else if (name === "image" && files) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (label.trim() === "") {
      toast.error("نام بنر نباید خالی باشد");
      return;
    }

    if (image === null) {
      toast.error("لطفا عکسی برای بنر انتخاب کنید");
      return;
    }

    createBanner();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        handleChange={handleInputChange}
        label="نام بنر"
        name="label"
        value={label}
      />
      <input type="file" onChange={handleInputChange} name="image" />
      <div>{image?.name}</div>
      <button className="bg-purple-600 text-white p-4 rounded">
        ایجاد بنر
      </button>
    </form>
  );
};

export default AddBannerScreen;
