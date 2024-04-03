import { En_To_Fa } from "@/utils/functions";
import React, { FC } from "react";
import { TiTick } from "react-icons/ti";

interface IProps {
  item: { id: number; name: string };
  activeTimeIndex: number | null;
  setActiveTimeIndex: (index: number) => void;
}

const SelectTimeSend: FC<IProps> = ({
  item,
  activeTimeIndex,
  setActiveTimeIndex,
}) => {
  return (
    <>
      <p className="text-sm">زمان تحویل به {item.name}</p>
      <div className="flex gap-3 text-xs lg:text-sm">
        <div className="flex flex-col items-center gap-3">
          <div
            onClick={() => setActiveTimeIndex(0)}
            className={`flex flex-col gap-2 border rounded-lg p-2 w-fit cursor-pointer ${
              activeTimeIndex === 0 ? "border-green-600 border-2" : ""
            }`}
          >
            <span>ساعت</span>
            <span>{En_To_Fa(`13 تا 14`)}</span>
          </div>
          {activeTimeIndex === 0 && (
            <TiTick size={22} className="text-green-600" />
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <div
            onClick={() => setActiveTimeIndex(1)}
            className={`flex flex-col gap-2 border rounded-lg p-2 w-fit cursor-pointer ${
              activeTimeIndex === 1 ? "border-green-600 border-2" : ""
            }`}
          >
            <span>ساعت</span>
            <span>{En_To_Fa(`15 تا 16`)}</span>
          </div>
          {activeTimeIndex === 1 && (
            <TiTick size={22} className="text-green-600" />
          )}
        </div>
      </div>
    </>
  );
};

export default SelectTimeSend;
