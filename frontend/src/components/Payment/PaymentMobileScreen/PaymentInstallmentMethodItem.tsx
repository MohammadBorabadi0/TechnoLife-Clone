import { useStore } from "@/store/store";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  index: number;
  item: { title: string; description: string; image: string };
}

const PaymentInstallmentItem: FC<IProps> = ({ item, index }) => {
  const {
    activePaymentInstallmentIndex,
    setActivePaymentInstallmentIndex,
    setActivePaymentIndex,
  } = useStore((state) => state);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setActivePaymentInstallmentIndex(index);
      setActivePaymentIndex(null);
    }
  };

  return (
    <div
      onClick={() => {
        setActivePaymentInstallmentIndex(index);
        setActivePaymentIndex(null);
      }}
      className={`flex items-center justify-between gap-5 rounded-lg p-3 cursor-pointer bg-white ${
        index === activePaymentInstallmentIndex ? "shadow-3xl" : "border"
      }`}
    >
      <div className="flex items-center gap-4 px-3 rounded">
        <input
          type="radio"
          className="w-5 h-5"
          checked={index === activePaymentInstallmentIndex}
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
        className="object-cover w-11 h-full"
      />
    </div>
  );
};
export default PaymentInstallmentItem;
