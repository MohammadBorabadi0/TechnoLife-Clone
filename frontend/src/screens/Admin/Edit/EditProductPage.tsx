"use client";

import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ImageData, ImageUploadData, ProductData } from "@/utils/type";
import Input from "@/components/Admin/add/Input";
import { initializeApp } from "firebase/app";
import toast from "react-hot-toast";
import { initialProductData } from "@/data/data";
import { SelectChangeEvent } from "@mui/material";
import {
  useBrandStore,
  useCategoryStore,
  useColorStore,
  useProductStore,
} from "@/store/store";
import SelectComponent from "@/components/Admin/add/Select";
import { useParams } from "next/navigation";
import { fetchImagesFromFirebase } from "@/utils/functions";
import SelectImage from "@/components/Admin/SelectImage";
import { useRouter } from "next/navigation";

const EditProductScreen: React.FC = () => {
  const { product, fetchProduct, updateProduct } = useProductStore(
    (state) => state
  );
  const { colors, fetchColors } = useColorStore((state) => state);
  const { brands, fetchBrands } = useBrandStore((state) => state);
  const { categories, fetchCategories } = useCategoryStore((state) => state);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductData>(initialProductData);
  const [images, setImages] = useState<ImageData[]>([
    { file: null, color: "", price: 0 },
  ]);

  const { productId } = useParams();
  const router = useRouter();

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const newImages = [...images];
  //     newImages[index] = { ...newImages[index], file };
  //     setImages(newImages);
  //   }
  // };

  const addImageToState = useCallback((value: ImageData) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageData) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color === value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  const handleColorChange = (color: string, index: number) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], color };
    setImages(newImages);
  };

  const handlePriceChange = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const price = parseFloat(event.target.value);
    const newImages = [...images];
    newImages[index] = { ...newImages[index], price };
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([...images, { file: null, color: "", price: 0 }]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

      console.log({ images });

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

      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...data, images: updatedImages }),
        }
      );
      setLoading(false);
      const result = await response.json();
      console.log({ result });
      router.push("/admin/products");
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
          <span className="text-black">Wait for create Product</span>
          <img src="/ball.svg" className="w-8 h-8" alt="Loading" />
        </div>
      ));
    }
  }, [loading]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  useEffect(() => {
    fetchProduct(productId.toString());
  }, [fetchProduct]);

  useEffect(() => {
    if (product) {
      setData(product);
    }
    const fetchImages = async () => {
      const updatedImages: ImageData[] = [];

      for (const image of data.images!) {
        if (image.file) {
          const imageFile = await fetchImagesFromFirebase(image.file);
          updatedImages.push({ ...image, file: imageFile });
        }
      }

      setImages(updatedImages);
    };
    fetchImages();
    console.log({ product });
  }, [product]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-5 px-3">
      <div className="flex gap-5 items-center">
        <button
          type="button"
          onClick={handleAddImage}
          className="p-4 rounded bg-amber-600 text-white"
        >
          Add Another Image
        </button>
        <button
          type="button"
          className="bg-red-600 text-white p-4 rounded"
          onClick={() => setImages([])}
        >
          Delete All Images
        </button>
      </div>
      <Input
        label="نام محصول (*)"
        name="name"
        value={data.name}
        handleChange={handleInputChange}
      />
      <SelectComponent
        data={categories}
        handleChange={handleSelectChange}
        label="دسته بندی محصول (*)"
        name="category"
        value={data.category}
      />

      <SelectComponent
        data={brands}
        handleChange={handleSelectChange}
        label="برند محصول (*)"
        name="brand"
        value={data.brand}
      />

      <Input
        label="درصد تخفیف"
        name="discount"
        type="number"
        value={data.discount || 0}
        handleChange={handleInputChange}
      />
      <Input
        label="موجودی محصول"
        name="countInStock"
        type="number"
        value={data.countInStock}
        handleChange={handleInputChange}
      />
      <Input
        label="توضیحات محصول (*)"
        name="description"
        value={data.description}
        handleChange={handleInputChange}
      />

      {images.map((image, index) => (
        <SelectImage
          key={index}
          item={image}
          data={data}
          colors={colors}
          index={index}
          images={images}
          setImages={setImages}
          handleColorChange={handleColorChange}
          handlePriceChange={handlePriceChange}
          addImageToState={addImageToState}
          removeImageFromState={removeImageFromState}
        />
      ))}

      <button
        type="submit"
        className="flex-1 py-4 rounded bg-blue-600 text-white"
      >
        {loading ? "Loading ..." : "Submit"}
      </button>
    </form>
  );
};

export default EditProductScreen;
