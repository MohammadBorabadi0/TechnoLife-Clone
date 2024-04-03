import { useFilterStore } from "@/store/store";
import { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface IProps {
  handleRemoveFromFilters: (itemToRemove: string) => void;
}

const ShowActiveFilters: FC<IProps> = ({ handleRemoveFromFilters }) => {
  const { filters } = useFilterStore((state) => state);

  return (
    <>
      {(filters.brand !== null || filters.color !== null) && (
        <div className="flex flex-wrap gap-3 p-3 border-b text-xs">
          {filters.brand?.split("_").map((item) => (
            <div
              key={item}
              className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-lg"
            >
              <p>برندها: {item}</p>
              <button onClick={() => handleRemoveFromFilters(item)}>
                <IoCloseSharp size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShowActiveFilters;
