import { useStore } from "@/store/store";
import Image from "next/image";
import { FC, useState } from "react";

interface IProps {
  item: { title: string; description: string; image: string };
  index: number;
}

const PaymentMethodItem: FC<IProps> = ({ item, index }) => {
  const {
    activePaymentIndex,
    setActivePaymentIndex,
    setActivePaymentInstallmentIndex,
  } = useStore((state) => state);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setActivePaymentIndex(index);
      setActivePaymentInstallmentIndex(null);
    }
  };

  return (
    <div
      onClick={() => {
        setActivePaymentIndex(index);
        setActivePaymentInstallmentIndex(null);
      }}
      className={`flex justify-between items-center gap-5 rounded-lg px-4 py-3 cursor-pointer bg-white ${
        index === activePaymentIndex ? "shadow-3xl" : "border"
      }`}
    >
      <div className="flex items-center gap-4 rounded">
        <input
          type="radio"
          className="w-5 h-5"
          checked={index === activePaymentIndex}
          onChange={handleRadioChange}
        />
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-black">{item.title}</h4>
          <p className="text-sm">{item.description}</p>
        </div>
      </div>
      <Image
        src={item.image}
        alt={item.title}
        title={item.title}
        width={80}
        height={80}
        className="object-cover w-10 h-full"
      />
    </div>
  );
};

export default PaymentMethodItem;