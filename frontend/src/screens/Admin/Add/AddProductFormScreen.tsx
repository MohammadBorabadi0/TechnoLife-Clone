"use client";

import BasicInformation from "@/components/Admin/add/BasicInformation";
import ProductSpecifications from "@/components/Admin/add/ProductSpecifications";
import { SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { initialData, useColorStore, useProductStore } from "@/store/store";
import { useRouter } from "next/navigation";
import SelectColor from "@/components/Admin/SelectColor";
import { ImageData, ImageUploadData } from "@/utils/type";
import Title from "@/components/Admin/add/Title";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import toast from "react-hot-toast";

const AddProductForm: React.FC = () => {
  const { productData, setProductData, addProduct } = useProductStore(
    (state) => state
  );
  const { colors, fetchColors } = useColorStore((state) => state);
  const [images, setImages] = useState<ImageData[] | null>([]);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    console.log({ name, value });
 
    if (
      name === "name" ||
      name === "category" ||
      name === "brand" ||
      name === "countInStock" ||
      name === "discount" ||
      name === "discountTime" ||
      name === "description"
    ) {
      setProductData({ ...productData, [name]: value });
    } else {
      setProductData({
        ...productData,
        specifications: { ...productData.specifications, [name]: value },
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const removeImageFromState = useCallback((value: ImageData) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  const addImageToState = useCallback((value: ImageData) => {
    setImages((prev) => {
      const existingColorIndex = prev?.findIndex(
        (item) => item.color === value.color
      ) as number;
      if (existingColorIndex !== -1) {
        const updatedImages = [...(prev || [])];
        updatedImages[existingColorIndex] = value;
        return updatedImages;
      } else {
        return [...(prev || []), value];
      }
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const firebaseConfig = {
        apiKey: "AIzaSyBSc-N3heswo-2ihOhwYVJkHZwGKHOxWDE",
        authDomain: "image-upload-2c94b.firebaseapp.com",
        projectId: "image-upload-2c94b",
        storageBucket: "image-upload-2c94b.appspot.com",
        messagingSenderId: "803941663276",
        appId: "1:803941663276:web:6f8a6f58ccd1de7add0789",
        measurementId: "G-RHCNFSRP9J",
      };

      const app = initializeApp(firebaseConfig);

      const storage = getStorage(app);
      const updatedImages: ImageUploadData[] = [];

      for (const image of images!) {
        if (image.file) {
          const storageRef = ref(
            storage,
            `products/${image.file.name + "-" + new Date().getTime()}`
          );
          await uploadBytes(storageRef, image.file);
          const downloadURL = await getDownloadURL(storageRef);
          updatedImages.push({ ...image, file: downloadURL });
        }
      }

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...productData, images: updatedImages }),
      });
      setLoading(false);
      const { data, success, message } = await response.json();
      console.log({ data });
      if (success) {
        toast.success(message);
        router.push("/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("هنگام افزودن محصول مشکلی بوجود آمد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      toast((t) => (
        <div className="flex items-center gap-3">
          <span className="text-black">لطفا کمی صبر کنید ...</span>
          <img src="/ball.svg" className="w-8 h-8" alt="Loading" />
        </div>
      ));
    }
  }, [loading]);

  // reset values product data
  useEffect(() => {
    setProductData(initialData);
  }, []);

  // fetch all colors
  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 m-3">
      <div className="flex gap-5">
        <button
          type="button"
          onClick={() => setShowSpecifications(!showSpecifications)}
          className="bg-amber-600 text-white px-4 py-2 w-fit rounded"
        >
          {showSpecifications
            ? "پنهان کردن فرم مشخصات محصول"
            : " نمایش فرم مشخصات محصول"}
        </button>
      </div>
      <BasicInformation
        name={productData.name}
        brand={productData.brand}
        category={productData.category}
        description={productData.description}
        countInStock={productData.countInStock}
        discount={productData.discount}
        discountTime={productData.discountTime}
        handleChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />

      <section className="flex flex-col border rounded-md shadow-sm pb-5">
        <Title activeStep={0} step={0} title="افزودن تصویر" />
        <div className="grid grid-cols-2 gap-7 pt-6 px-4">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              images={images}
              setImages={setImages}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
            />
          ))}
        </div>
      </section>

      {showSpecifications && (
        <ProductSpecifications
          battery={productData.specifications.battery}
          bluetooth={productData.specifications.bluetooth}
          connectionType={productData.specifications.connectionType}
          cpu={productData.specifications.cpu}
          gpu={productData.specifications.gpu}
          os={productData.specifications.os}
          ram={productData.specifications.ram}
          dimensions={productData.specifications.dimensions}
          mainCamera={productData.specifications.mainCamera}
          selfieCamera={productData.specifications.selfieCamera}
          memory={productData.specifications.memory}
          outputPower={productData.specifications.outputPower}
          screenSize={productData.specifications.screenSize}
          screenType={productData.specifications.screenType}
          sensors={productData.specifications.sensors}
          weight={productData.specifications.weight}
          handleChange={handleInputChange}
        />
      )}
      <button type="submit" className="bg-purple-700 text-white py-3 rounded">
        افزودن محصول
      </button>
    </form>
  );
};

export default AddProductForm;

// ----------------------------------------------------------------------------------------------------

// "use client";
// import React, { useState } from 'react';
// import { Image, CloudinaryContext } from '@cloudinary/react';
// import { Transformation } from '@cloudinary/base';
// import axios from 'axios';

// const CloudinaryImageUploader: React.FC = () => {
//   const [imageUrl, setImageUrl] = useState<string>('');

//   const uploadImage = async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'your_upload_preset'); // Replace 'your_upload_preset' with your actual Cloudinary upload preset

//     try {
//       const response = await axios.post<{ secure_url: string }>(
//         'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
//         formData
//       );

//       setImageUrl(response.data.secure_url);
//     } catch (error) {
//       console.error('Error uploading image: ', error);
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const file = e.target.files[0];
//       uploadImage(file);
//     }
//   };

//   return (
//     <CloudinaryContext cloudName="your_cloud_name">
//       <div>
//         <input type="file" onChange={handleImageUpload} />
//         {imageUrl && (
//           <Image publicId={imageUrl}>
//             <Transformation width="300" crop="scale" />
//           </Image>
//         )}
//       </div>
//     </CloudinaryContext>
//   );
// };

// export default CloudinaryImageUploader;
