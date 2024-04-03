import { ChangeEvent, FC, useEffect, useState } from "react";

interface IProps {
  image: File | null;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SelectImageForm: FC<IProps> = ({ image, handleChange }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (mount)
    return (
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <label
            htmlFor="image-upload"
            className="flex gap-3 cursor-pointer px-4 py-1 rounded-lg"
          >
            <input
              id="image-upload"
              type="file"
              name="image"
              className="hidden"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleChange}
            />
            <span className="bg-orange-500 text-white px-2 py-1 rounded-sm">
              انتخاب تصویر
            </span>
          </label>
        </div>
      </div>
    );
};

export default SelectImageForm;
