'use client';
import AddImage from "@/components/Admin/add/AddImage";
import BasicInformation from "@/components/Admin/add/BasicInformation";
import ProductSpecifications from "@/components/Admin/add/ProductSpecifications";
import { useProductStore } from "@/store/store";
import createFormData from "@/utils/createFormData";
import { IProduct } from "@/utils/type";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface ImageData {
  file: File;
  color: string;
  price: number;
  [key: string]: any;
}

interface ProductData {
  name: string,
  description: string,
  brand: string,
  category: string,
  countInStock: number,
  discount: number,
  cpu: string,
  gpu: string,
  ram: string,
  os: string,
  memory: string,
  screenSize: string,
  screenType: string,
  mainCamera: string,
  selfieCamera: string,
  battery: string,
  sensors: string,
  connectionType: string,
  bluetooth: string,
  dimensions: string,
  weight: string,
  outputPower: string,
  images: ImageData[];
}

const AddProductScreen: React.FC = () => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    battery: '',
    bluetooth: '',
    brand: '',
    category: '',
    connectionType: '',
    countInStock: 0,
    cpu: '',
    gpu: '',
    dimensions: '',
    discount: 0,
    mainCamera: '',
    selfieCamera: '',
    memory: '',
    os: '',
    outputPower: '',
    ram: '',
    screenSize: '',
    screenType: '',
    sensors: '',
    weight: '',
    images: [
      { file: new File([], ''), color: '', price: 0 }
    ],
  });

  const { addProduct } = useProductStore((state) => state);

  const router = useRouter();

  // -----------------------------------------------------------------------------

  const handleImageChange = (index: number, file: File) => {
    const updatedImages = [...productData.images];
    updatedImages[index].file = file;
    setProductData({ ...productData, images: updatedImages });
  };

  const handleColorChange = (index: number, color: string) => {
    const updatedImages = [...productData.images];
    updatedImages[index].color = color;
    setProductData({ ...productData, images: updatedImages });
  };

  const handlePriceChange = (index: number, price: number) => {
    const updatedImages = [...productData.images];
    updatedImages[index].price = price;
    setProductData({ ...productData, images: updatedImages });
  };

  const renderAddImages = () => {
    return productData.images.map((image, index) => (
      <AddImage
        key={index}
        file={image.file}
        color={image.color}
        price={image.price}
        handleImageChange={(file) => handleImageChange(index, file)}
        handleColorChange={(color) => handleColorChange(index, color)}
        handlePriceChange={(price) => handlePriceChange(index, price)}
      />
    ));
  };

  // --------------------------------------------------------------------------------

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'color' || name === 'price' || name === 'file') {
      if (files) {
        const newImages = Array.from(files).map((file) => ({
          file,
          color: '',
          price: 0,
        }));
        setProductData({ ...productData, images: [...productData.images, ...newImages] });
      }
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }

  // const handleImageDetailsChange = (index: number, property: string, value: string) => {
  //   const updatedImages = [...productData.images];
  //   updatedImages[index][property] = value;
  //   setProductData({ ...productData, images: updatedImages });
  // };

  const handleAddImage = () => {
    const newImage = {
      file: new File([], ''),
      color: '',
      price: 0,
    };
    setProductData({ ...productData, images: [...productData.images, newImage] });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = createFormData(productData, productData.images);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      console.log({ data });

    } catch (error) {
      console.log(error);
    }
  };

  // const renderAddImages = () => {
  //   return productData.images.map((image, index) => (
  //     <AddImage
  //       key={index}
  //       file={image.file}
  //       color={image.color}
  //       price={image.price}
  //       handleChange={handleChange}
  //       handleSelectChange={handleSelectChange}
  //       handleImageDetailsChange={handleImageDetailsChange}
  //     />
  //   ));
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-3 flex flex-col gap-5 w-full text-sm"
    >
      <button
        type="button" // Change type to "button"
        onClick={handleAddImage} // Add click event handler
        className="bg-blue-600 text-white w-full py-2 px-4 text-base lg:text-lg rounded-sm"
      >
        افزودن تصویر دیگر
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <BasicInformation
          name={productData.name}
          category={productData.category}
          brand={productData.brand}
          countInStock={productData.countInStock}
          discount={productData.discount}
          description={productData.description}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
        {renderAddImages()}
      </div>
      <ProductSpecifications
        cpu={productData.cpu}
        gpu={productData.gpu}
        os={productData.os}
        ram={productData.ram}
        memory={productData.memory}
        screenSize={productData.screenSize}
        screenType={productData.screenType}
        mainCamera={productData.mainCamera}
        selfieCamera={productData.selfieCamera}
        battery={productData.battery}
        sensors={productData.sensors}
        connectionType={productData.connectionType}
        bluetooth={productData.bluetooth}
        weight={productData.weight}
        dimensions={productData.dimensions}
        outputPower={productData.outputPower}
        handleChange={handleChange}
      />
      <div className="flex gap-5 pb-5">
        <button
          type="submit"
          className="bg-purple-600 text-white w-full py-2 px-4 text-base lg:text-lg rounded-sm"
        >
          ایجاد محصول
        </button>
      </div>
    </form>
  );
};

export default AddProductScreen;
