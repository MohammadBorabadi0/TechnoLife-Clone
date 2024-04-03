import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IColor, ImageData, ImageUploadData, ProductData } from "@/utils/type";
import Input from "@/components/Admin/add/Input";
import { BiTrash } from "react-icons/bi";
import { useColorStore } from "@/store/store";

interface IProps {
  addImageToState: (value: ImageData) => void;
  removeImageFromState: (value: ImageData) => void;
  item: IColor;
  images: ImageData[] | null;
  setImages: Dispatch<SetStateAction<ImageData[] | null>>;
  productData?: ProductData;
}

const SelectColor: FC<IProps> = ({
  item,
  productData,
  images,
  setImages,
  addImageToState,
  removeImageFromState,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  // ------------------------------------------------

  console.log({ images });
  // ------------------------------------------------

  // New Codes

  const { fetchColor, color } = useColorStore((state) => state);

  useEffect(() => {
    if (color) fetchColor(color?._id);
  }, []);

  // Function to convert image URL to File object
  const urlToFile = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = `${Math.random() * 10000000000}.jpg`;
      const fileType = "image/jpeg";
      return new File([blob], fileName, { type: fileType });
    } catch (error) {
      console.error("Error converting URL to File:", error);
      return null;
    }
  };

  // useEffect to convert productdata.images.file to File
  useEffect(() => {
    const filteredImages = productData?.images.find(
      (image) => image.color === item._id
    );
    const fetchAndConvertImage = async () => {
      if (filteredImages) {
        try {
          const imageUrl = filteredImages.file;
          const file = await urlToFile(imageUrl);
          setFile(file);
        } catch (error) {
          console.error("Error converting URL to File:", error);
        }
      }
    };

    if (productData) {
      fetchAndConvertImage();
    }

    if (filteredImages) {
      setIsSelected(true);
      setPrice(filteredImages.price);
    } else {
      setFile(null);
      setIsSelected(false);
      setPrice(0);
    }
  }, [productData?.images, item]);

  // ------------------------------------------------

  // handle Checkbox
  const handleCheckbox = useCallback(() => {
    setIsSelected((prev) => !prev);
    setFile(null);
    setPrice(0);
  }, []);

  // handle Delete File
  const handleDeleteFile = useCallback(() => {
    setFile(null);
    const updatedImages = images?.filter((image) => image.color !== item._id);
    setImages(updatedImages || []);
  }, [images, setImages, item._id]);

  // handle File Change
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        addImageToState({ color: item._id, file: selectedFile, price });
      }
    },
    [item._id, price, addImageToState]
  );

  // handle Price Change
  const handlePriceChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPrice(+e.target.value);
      const updatedImages = images?.map((image) => {
        if (image.color === item._id) {
          return { ...image, price: +e.target.value };
        }
        return image;
      });
      setImages(updatedImages!);
    },
    [item._id, images]
  );

  // useEffect(() => {
  //   const filteredImages = productData?.images.find(
  //     (i) => i.color === item._id
  //   );

  //   const fetchAndConvertImage = async () => {
  //     try {
  //       const imageUrl = filteredImages?.file;
  //       const response = await fetch(imageUrl!);
  //       const blob = await response.blob();
  //       const fileName = `${Math.random() * 10000000000}.jpg`;
  //       const fileType = "image/jpeg";
  //       const file = new File([blob], fileName, { type: fileType });
  //       setFile(file);
  //     } catch (error) {
  //       console.error("Error converting URL to File:", error);
  //     }
  //   };

  //   if (productData) {
  //     fetchAndConvertImage();
  //   }

  //   if (filteredImages) {
  //     setIsSelected(true);
  //     setPrice(filteredImages.price);
  //   } else {
  //     setFile(null);
  //     setIsSelected(false);
  //     setPrice(0);
  //   }
  // }, [productData?.images, item]);

  useEffect(() => {
    if (isSelected) {
      addImageToState({ color: item._id, file, price });
    } else {
      removeImageFromState({ color: item._id, file, price });
    }
  }, [
    isSelected,
    addImageToState,
    removeImageFromState,
    item._id,
    file,
    price,
  ]);

  return (
    <div className="flex justify-between gap-8 border border-dashed p-4 rounded">
      <div className="flex flex-col gap-10 flex-1">
        <div className="flex gap-2">
          <input
            type="checkbox"
            id={item._id}
            checked={isSelected}
            onChange={handleCheckbox}
          />
          <label htmlFor={item._id}>{item.name}</label>
        </div>
        {isSelected && (
          <Input
            label="قیمت محصول"
            name="price"
            type="number"
            value={price}
            handleChange={handlePriceChange}
          />
        )}
      </div>

      {isSelected && !file && (
        <div className={`text-gray-500 border border-dashed w-1/4 rounded`}>
          <label
            htmlFor="file"
            className="grid place-items-center h-full w-full"
          >
            انتخاب تصویر
          </label>
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={handleFileChange}
          />
        </div>
      )}

      {isSelected && file && (
        <div className="relative group">
          <img
            src={URL.createObjectURL(file)}
            alt="Selected Image"
            className="w-32 h-full object-cover"
          />
          <div className="hidden absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center">
            <button
              type="button"
              className="bg-red-600 text-white p-1.5 w-fit rounded-full"
              onClick={handleDeleteFile}
            >
              <BiTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectColor;
