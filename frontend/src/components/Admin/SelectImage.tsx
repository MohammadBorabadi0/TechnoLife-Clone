import { SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import SelectComponent from './add/Select';
import Input from '@/components/Admin/add/Input'
import { IColor, ImageData, ImageUploadData, ProductData } from '@/utils/type';

interface IProps {
  item: ImageData;
  index: number;
  data: ProductData;
  colors: IColor[];
  images: ImageData[]; setImages: Dispatch<SetStateAction<ImageData[]>>;
  handleColorChange: (color: string, index: number) => void;
  handlePriceChange: (event: SelectChangeEvent<string>, index: number) => void;
  addImageToState: (value: ImageData) => void; removeImageFromState: (value: ImageData) => void;
}

const SelectImage: FC<IProps> = ({ item, index, data, colors, images, setImages, addImageToState, removeImageFromState, handleColorChange, handlePriceChange }) => {
  const [file, setFile] = useState<File | null>(item.file || null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      const newImages = [...images];
      newImages[index] = { ...newImages[index], file: newFile };
      setImages(newImages);
    }
  }, [index, images]);

  console.log({ file });

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <SelectComponent
        data={colors}
        handleChange={(e) => handleColorChange(e.target.value, index)}
        label='Color'
        name='color'
        value={item.color} />
      <Input
        type="number"
        label="Price"
        name='price'
        value={item.price}
        handleChange={(e) => handlePriceChange(e, index)}
      />
      {file && <img src={URL.createObjectURL(file)} alt="Selected Image" style={{ maxWidth: '200px' }} />}
    </div>
  )
}

export default SelectImage;