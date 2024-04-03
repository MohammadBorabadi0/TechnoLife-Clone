import { useStore } from "@/store/store";
import { FC } from "react";
import CompanyOption from "./Edited/CompanyOption";
import SelectDaySend from "./Edited/SelectDaySend";
import SelectTimeSend from "./Edited/SelectTimeSend";

interface IProps {
  item: { id: number; name: string };
  index: number;
}

const SendCompanyOption: FC<IProps> = ({ item, index }) => {
  const {
    sendCompanyIndex,
    setSendCompanyIndex,
    activeDayIndex,
    setActiveDayIndex,
    activeTimeIndex,
    setActiveTimeIndex,
  } = useStore((state) => state);

  return (
    <div className="flex flex-col gap-5 bg-white rounded-lg shadow-3xl px-5 py-7">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setSendCompanyIndex(index)}
      >
        <input
          type="radio"
          className="w-5 h-5"
          checked={item.id === sendCompanyIndex}
          onChange={() => setSendCompanyIndex(index)}
        />
        <p className="text-black font-semibold">{item.name}</p>
      </div>
      {item.id === sendCompanyIndex ? (
        <section className="flex flex-col gap-5">
          {/* Select Day Send */}
          <SelectDaySend
            activeDayIndex={activeDayIndex}
            setActiveDayIndex={setActiveDayIndex}
          />
          {/* Select Time Send  */}
          <SelectTimeSend
            item={item}
            activeTimeIndex={activeTimeIndex}
            setActiveTimeIndex={setActiveTimeIndex}
          />

          <CompanyOption item={item} sendCompanyIndex={sendCompanyIndex} />
        </section>
      ) : null}
    </div>
  );
};

export default SendCompanyOption;
