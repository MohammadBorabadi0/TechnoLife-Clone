"use client";

import TableComponent from "@/components/Admin/tables/CategoriesAndBrandsTable/TableComponent";
import { useColorStore } from "@/store/store";
import { useEffect } from "react";

const ColorListScreen = () => {
    const { colors, fetchColors, deleteColor } = useColorStore(
        (state) => state
    );

    useEffect(() => {
        fetchColors();
    }, [fetchColors]);

    return (
        <TableComponent
            data={colors}
            deleteRow={deleteColor}
            title="رنگ ها"
            url="/admin/add-color"
            linkRouter="/admin/edit-color"
        />
    );
};

export default ColorListScreen;