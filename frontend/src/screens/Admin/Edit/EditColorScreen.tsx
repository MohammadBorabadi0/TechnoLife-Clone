"use client";

import Input from "@/components/Input";
import ColorPicker from "@/components/ColorPicker";
import { useColorStore } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/Button";

const EditColorScreen = () => {
    const [colorName, setColorName] = useState("");

    const { updateColor, color, fetchColor, colors, fetchColors, code, setColorCode } = useColorStore(
        (state) => state
    );

    const { colorId } = useParams();
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


        let Reg_Exp = /^#(?:[0-9a-fA-F]{3}){1,2}$/i;

        if (existsColorName && existsColorName._id !== colorId) {
            toast.error("رنگ با این نام از قبل وجود دارد");
            return;
        }

        if (existsColorCode && existsColorCode._id !== colorId) {
            toast.error("رنگ با این کد از قبل وجود دارد");
            return;
        }

        if (!Reg_Exp.test(code)) {
            toast.error("فرمت کد نادرست است");
            return;
        }

        updateColor(colorId.toString(), colorName.toLowerCase(), code.toLowerCase());
        router.push("/admin/colors");
    };

    // fetch all colors 
    useEffect(() => {
        fetchColors();
    }, [fetchColors]);

    // set color data
    useEffect(() => {
        if (color?.name && color?.code) {
            setColorName(color?.name);
            setColorCode(color?.code);
        }
    }, [color]);

    // fetch color by id 
    useEffect(() => {
        fetchColor(colorId.toString());
    }, [fetchColor]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <Input
                placeholder="نام رنگ"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
            />

            <Input
                placeholder="کد رنگ"
                value={code}
                onChange={(e) => setColorCode(e.target.value)}
            />

            <ColorPicker />

            <Button text="ویرایش رنگ" />
        </form>
    );
};

export default EditColorScreen;
