import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// components
import Title from "./Title";
import Input from "./Input";
import SelectComponent from "./Select";

// mui components
import { SelectChangeEvent } from "@mui/material";
import { useBrandStore, useCategoryStore } from "@/store/store";

interface IProps {
  name: string;
  category: string;
  brand: string;
  countInStock: number;
  discount?: number;
  discountTime?: number;
  description: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: SelectChangeEvent) => void;
}

const BasicInformation: FC<IProps> = ({
  name,
  category,
  brand,
  countInStock,
  discount,
  discountTime,
  description,
  handleChange,
  handleSelectChange,
}) => {
  // Active Step
  const [activeStep, setActiveStep] = useState(0);

  const { categories, fetchCategories } = useCategoryStore((state) => state);
  const { brands, fetchBrands } = useBrandStore((state) => state);

  useEffect(() => {
    const inputValues = [
      name,
      category,
      brand,
      countInStock,
      discount,
      discountTime,
      description,
    ];
    const newStep = inputValues.filter((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      } else {
        return value && value > 0;
      }
    }).length;
    setActiveStep(newStep);
  }, [name, category, brand, countInStock, discount, description]);

  // Fetch Brands
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Fetch Categories
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="flex flex-col border rounded-md shadow-sm pb-5">
      <Title title="اطلاعات اولیه" step={5} activeStep={activeStep} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 p-4">
        <Input
          name="name"
          label="نام محصول"
          value={name}
          handleChange={handleChange}
        />
        <SelectComponent
          name="category"
          label="دسته بندی"
          data={categories}
          value={category}
          handleChange={handleSelectChange}
        />
        <SelectComponent
          name="brand"
          label="برند"
          data={brands}
          value={brand}
          handleChange={handleSelectChange}
        />
        <Input
          name="countInStock"
          type="number"
          label="موجودی محصول"
          value={countInStock!}
          handleChange={handleChange}
        />
        <Input
          name="discount"
          type="number"
          label="تخفیف محصول (اختیاری)"
          value={discount!}
          handleChange={handleChange}
        />
        <Input
          name="discountTime"
          type="number"
          label="مدت زمان تخفیف محصول (اختیاری)"
          value={discountTime || 0}
          handleChange={handleChange}
        />
        <Input
          name="description"
          label="توضیحات محصول"
          value={description}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default BasicInformation;
