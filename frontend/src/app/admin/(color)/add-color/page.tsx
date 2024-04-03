"use client";

import Input from "@/components/Input";
import ColorPicker from "@/components/ColorPicker";
import { useColorStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/Button";

const AddColorPage = () => {
  const [colorName, setColorName] = useState("");

  const { addColor, colors, fetchColors, code } = useColorStore(
    (state) => state
  );

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!colorName.trim()) {
      toast.error("نام رنگ الزامی است");
      return;
    }

    const existsColorName = colors.find(
      (color) => color.name === colorName.toLowerCase()
    );

    const existsColorCode = colors.find(
      (color) => color.code === code.toLowerCase()
    );

    let Reg_Exp = /^#[0-9A-F]{6}$/i;

    if (existsColorName) {
      toast.error("رنگ با این نام از قبل وجود دارد");
      return;
    }

    if (existsColorCode) {
      toast.error("رنگ با این کد از قبل وجود دارد");
      return;
    }

    if (!Reg_Exp.test(code)) {
      toast.error("فرمت کد نادرست است");
      return;
    }

    addColor(colorName, code);
    router.push("/admin/colors");
  };

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Input
        placeholder="نام رنگ"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
      />

      <ColorPicker />

      <Button text="ایجاد رنگ" />
    </form>
  );
};

export default AddColorPage;
