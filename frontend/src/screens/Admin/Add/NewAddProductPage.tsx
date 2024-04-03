'use client';
import AddImage from "@/components/Admin/add/AddImage";
import BasicInformation from "@/components/Admin/add/BasicInformation";
import ProductSpecifications from "@/components/Admin/add/ProductSpecifications";
import { useProductStore } from "@/store/store";
import createFormData from "@/utils/createFormData";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const NewAddProductPage = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    countInStock: 0,
    discount: 0,
    color: "",
    price: 0,
    cpu: "",
    gpu: "",
    ram: "",
    os: "",
    memory: "",
    screenSize: "",
    screenType: "",
    mainCamera: "",
    selfieCamera: "",
    battery: "",
    sensors: "",
    connectionType: "",
    bluetooth: "",
    dimensions: "",
    weight: "",
    outputPower: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const { addProduct } = useProductStore((state) => state);

  const router = useRouter();

  // handle Change 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === "image" && files) {
      setImage(files[0]);
    } else {
      setData({ ...data, [name]: e.target.value });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  // handle Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = createFormData(data, image);

    if (data.name.length < 3) {
      toast.error('نام محصول نمی تواند خالی باشد');
      return;
    }

    if (data.category.length < 3) {
      toast.error('دسته بندی نمی تواند خالی باشد');
      return;
    }

    if (data.brand.length < 3) {
      toast.error('برند نمی تواند خالی باشد');
      return;
    }

    if (image === null) {
      toast.error('لطفا تصویری برای محصول انتخاب کنید');
      return;
    }

    if (data.color.length < 3) {
      toast.error('لطفا رنگی برای محصول انتخاب کنید');
      return;
    }

    if (data.price <= 0) {
      toast.error('لطفا قیمت محصول را وارد کنید');
      return;
    }

    addProduct(formData);

    router.push('/admin/products');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-3 flex flex-col gap-5 w-full text-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <BasicInformation
          name={data.name}
          category={data.category}
          brand={data.brand}
          countInStock={data.countInStock}
          discount={data.discount}
          description={data.description}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
        <AddImage
          color={data.color}
          price={data.price}
          image={image}
          setImage={setImage}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
      </div>
      <ProductSpecifications
        cpu={data.cpu}
        gpu={data.gpu}
        os={data.os}
        ram={data.ram}
        memory={data.memory}
        screenSize={data.screenSize}
        screenType={data.screenType}
        mainCamera={data.mainCamera}
        selfieCamera={data.selfieCamera}
        battery={data.battery}
        sensors={data.sensors}
        connectionType={data.connectionType}
        bluetooth={data.bluetooth}
        weight={data.weight}
        dimensions={data.dimensions}
        outputPower={data.outputPower}
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

export default NewAddProductPage;
