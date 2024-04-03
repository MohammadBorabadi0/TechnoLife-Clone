import { En_To_Fa } from "@/utils/functions";
import { FC } from "react";

interface IProps {
  activeDayIndex: number;
  setActiveDayIndex: (index: number) => void;
}

const SelectDaySend: FC<IProps> = ({ activeDayIndex, setActiveDayIndex }) => {
  return (
    <div className="flex gap-2 text-xs sm:text-sm lg:text-base">
      <div
        onClick={() => setActiveDayIndex(0)}
        className={`flex flex-col items-center justify-center w-16 lg:w-20 py-3 select-none cursor-pointer rounded-lg gap-1 ${
          activeDayIndex === 0 ? "bg-blue-600 text-white" : "bg-gray-50"
        }`}
      >
        <span>دوشنبه</span>
        <span
          className={`${
            activeDayIndex === 0 ? "text-white" : "text-black"
          } text-lg xl:text-xl font-semibold`}
        >
          {En_To_Fa("14")}
        </span>
        <span>فروردین</span>
      </div>
      <div
        onClick={() => setActiveDayIndex(1)}
        className={`flex flex-col items-center justify-center w-16 lg:w-20 py-3 select-none cursor-pointer rounded-lg gap-1 ${
          activeDayIndex === 1 ? "bg-blue-600 text-white" : "bg-gray-50"
        }`}
      >
        <span>سه شنبه</span>
        <span
          className={`${
            activeDayIndex === 1 ? "text-white" : "text-black"
          } text-lg xl:text-xl font-semibold`}
        >
          {En_To_Fa("15")}
        </span>
        <span>فروردین</span>
      </div>
    </div>
  );
};

export default SelectDaySend;
