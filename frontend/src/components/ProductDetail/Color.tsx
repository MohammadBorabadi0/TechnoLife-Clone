import { useStore } from "@/store/store";
import { IColor } from "@/utils/type";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { TiTick } from "react-icons/ti";

interface ColorProps {
  colors: (IColor | undefined)[];
}

const Color: FC<ColorProps> = ({ colors }) => {
  const { activeIndex, setActiveIndex } = useStore((state) => state);

  return (
    <>
      {colors?.map((item, index) => (
        <button
          key={item?._id || index}
          onClick={() => {
            setActiveIndex(index);
          }}
          className={`flex items-center gap-2 border py-0.5 pr-1 pl-2 w-[90px] rounded text-xs sm:text-sm transition-all duration-150 ${
            activeIndex === index
              ? "opacity-100 border-yellow-700"
              : "opacity-70"
          }`}
        >
          <span
            className={`flex justify-center items-center w-4 h-4 rounded border ${
              item?.name === "سفید" || item?.name === "نقره ای"
                ? "text-black"
                : "text-white"
            }`}
            style={{ backgroundColor: item?.code }}
          >
            {activeIndex === index ? <TiTick size={18} /> : null}
          </span>
          <span>{item?.name}</span>
        </button>
      ))}
    </>
  );
};

export default Color;

{
  /* <>
{colors?.map((item, index) => (
  <button
    key={item._id}
    onClick={() => setActiveIndex(index)}
    className={`flex items-center gap-2 border py-0.5 pr-1 pl-2 w-[90px] rounded text-xs sm:text-sm transition-all duration-150 ${
      activeIndex === index
        ? "opacity-100 border-yellow-700"
        : "opacity-70"
    }`}
  >
    <span
      className={`flex justify-center items-center w-4 h-4 rounded border ${
        item.name === "سفید" || item.name === "نقره ای"
          ? "text-black"
          : "text-white"
      }`}
      style={{ backgroundColor: item.code }}
    >
      {activeIndex === index ? <TiTick size={18} /> : null}
    </span>
    <span>{item.name}</span>
  </button>
))}
</> */
}
