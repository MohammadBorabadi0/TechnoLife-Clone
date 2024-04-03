import { useColorStore } from "@/store/store";
import { ImageUploadData } from "@/utils/type";
import React, { FC, useEffect } from "react";

interface IProps {
  item: ImageUploadData;
}

const ProductColorItem: FC<IProps> = ({ item }) => {
  const { fetchColors, colors } = useColorStore((state) => state);

  useEffect(() => {
    fetchColors();
  }, []);

  const color = colors.find((color) => color._id === item.color);

  return (
    <>
      <span
        className="block w-2 h-2 bg-yellow-600 border border-gray-300 rounded-full"
        style={{ backgroundColor: color?.code }}
      ></span>
    </>
  );
};

export default ProductColorItem;
