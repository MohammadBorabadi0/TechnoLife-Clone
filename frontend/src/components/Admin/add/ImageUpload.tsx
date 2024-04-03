"use client";

import SelectImageForm from "./SelectImageForm";
import { ChangeEvent, SetStateAction, Dispatch, FC } from "react";
import { TbCloudUpload } from "react-icons/tb";

interface IProps {
  image: File | null;
  // setImage: Dispatch<SetStateAction<File | null>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: FC<IProps> = ({ image, handleChange }) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   if (event.dataTransfer.files) {
  //     setImage(event.dataTransfer.files[0]);
  //   }
  // };

  return (
    <div className="flex flex-col justify-center gap-5 p-5">
      <div
        onDragOver={handleDragOver}
        // onDrop={handleDrop}
        className="relative border-2 border-purple-600 text-purple-600 border-dashed rounded-lg flex flex-col gap-5 p-3 h-80 items-center justify-center"
      >
        <TbCloudUpload size={50} />
        <p className="text-gray-800 text-center text-xs font-semibold">
          یک تصویر را در اینجا بکشید و رها کنید یا برای انتخاب یک تصویر کلیک
          کنید
        </p>
        <span className="text-gray-500">یا</span>
        <SelectImageForm image={image} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default ImageUpload;
