import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useColorStore, useProductStore } from '@/store/store';
import SelectComponent from '@/components/Admin/add/Select';
import Title from '@/components/Admin/add/Title';
import { TbCloudUpload } from 'react-icons/tb';
import { BiTrash } from 'react-icons/bi';
import { CiImageOff } from 'react-icons/ci';
import Input from '@/components/Admin/add/Input';

interface IProps {
  index: number;
  color: string;
  file: File | null;
  price: number;
  handleDelete: (index: number) => void;
}

const AddImage: FC<IProps> = ({ index, color, price, file, handleDelete }) => {

  const { productData, setProductData } = useProductStore((state) => state);
  const { colors, fetchColors } = useColorStore(state => state);

  // const [file,setFile]=useState();

  // Active Step
  const [activeStep, setActiveStep] = useState(0);


  // Active Step Handler 
  const handleActiveStep = () => {
    let newStep = 0;

    if (file !== null) newStep += 1;
    if (color !== "") newStep += 1;
    if (price > 0) newStep += 1;

    setActiveStep(newStep);
  };

  useEffect(() => {
    handleActiveStep();
  }, [file, color, price]);

  const handleColorChange = (e: SelectChangeEvent<string>) => {
    const selectedColor = e.target.value;
    const updatedImages = productData.images.map((image, i) => {
      if (i === index) {
        return { ...image, color: selectedColor };
      }
      return image;
    });
    setProductData({
      ...productData,
      images: updatedImages
    });
    handleActiveStep();
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const updatedImages = productData.images.map((image, i) => {
        if (i === index) {
          return { ...image, file: selectedFile };
        }
        return image;
      });

      if (file && typeof file === 'string') {
        URL.revokeObjectURL(file);
      }

      setProductData({ ...productData, images: updatedImages });
    }
    handleActiveStep();
  };

  // const handleFileSelection = (index, event) => {
  //   const file = event.target.files[0];
  //   const updatedImages = productData.images.map((image, i) => {
  //     if (i === index) {
  //       // Replace the existing image with the new file
  //       return { ...image, file: file };
  //     }
  //     return image;
  //   });

  //   // Delete the previous image if a new file is selected
  //   if (productData.images[index].file) {
  //     URL.revokeObjectURL(productData.images[index].file);
  //   }

  //   setProductData({ ...productData, images: updatedImages });
  // };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    const updatedImages = productData.images.map((image, i) => {
      if (i === index) {
        return { ...image, price: newPrice };
      }
      return image;
    });
    setProductData({
      ...productData,
      images: updatedImages,
    });
    handleActiveStep();
  };

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return (
    <section className="rounded border">
      <Title title="افزودن تصویر محصول" step={3} activeStep={activeStep} />
      <div className='flex flex-col gap-6 p-3'>
        <button
          type='button'
          className='flex items-center gap-6 w-fit bg-red-600 text-white px-4 py-2 rounded'
          onClick={() => handleDelete(index)}
        >
          حذف فرم تصویر
          <BiTrash size={18} />
        </button>
        <div className='flex flex-col items-center md:flex-row gap-4'>
          <div className="w-full md:w-3/4">
            <div
              className="relative border-2 border-purple-600 text-purple-600 border-dashed rounded-lg flex flex-col gap-5 p-3 h-80 items-center justify-center"
            >
              <TbCloudUpload size={50} />
              <p className="text-gray-800 text-center text-xs font-semibold">
                یک تصویر را در اینجا بکشید و رها کنید یا برای انتخاب یک تصویر کلیک
                کنید
              </p>
              <span className="text-gray-500">یا</span>
              <div className='flex flex-col gap-3'>
                <div className="flex items-center justify-center w-32 h-12 border border-dashed border-gray-400 rounded-md">
                  <label htmlFor={`file${index}`} className="flex justify-center items-center text-sm font-medium text-purple-600 cursor-pointer h-full w-full">انتخاب یک تصویر</label>
                  <input type="file" id={`file${index}`} name='file' accept=".png,.jpg,.jpeg,.webp" className="hidden" onChange={handleFileSelection} />
                </div>
              </div>
            </div>
          </div>

          {
            file && file.name ? <img src={URL.createObjectURL(file)}
              alt="Selected Image"
              className="w-64 h-64 md:w-1/4 md:h-full rounded-md object-cover"
            /> :
              <img
                src={`http://localhost:5000/${file}`}
                alt="Selected Image"
                className="w-64 h-64 md:w-1/4 md:h-full rounded-md object-cover"
              />
          }

          {
            file === null && <div className="flex text-xs w-full md:w-1/4 h-64 text-purple-700">
              <div className="flex justify-center items-center flex-col w-full gap-5 border-2 border-dashed border-purple-600 rounded-md p-5">
                <CiImageOff size={40} />
                <span className="text-center">
                  هنوز تصویری را انتخاب نکرده اید.
                </span>
              </div>
            </div>
          }

          {/* {file && file.name ? (
            <img
              src={`http://localhost:5000/${file}` ||}
              alt="Selected Image"
              className="w-64 h-64 md:w-1/4 md:h-full rounded-md object-cover"
            />
          ) : (
            <div className="flex text-xs w-full md:w-1/4 h-64 text-purple-700">
              <div className="flex justify-center items-center flex-col w-full gap-5 border-2 border-dashed border-purple-600 rounded-md p-5">
                <CiImageOff size={40} />
                <span className="text-center">
                  هنوز تصویری را انتخاب نکرده اید.
                </span>
              </div>
            </div>
          )} */}


        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 pb-3'>
          <SelectComponent
            data={colors}
            label='انتخاب رنگ محصول'
            name='color'
            value={"" || color}
            handleChange={handleColorChange}
          />
          <Input
            type='number'
            label='قیمت محصول'
            name='price'
            value={price}
            handleChange={handlePriceChange}
          />
        </div>
      </div>
    </section>
  )
}

export default AddImage;
