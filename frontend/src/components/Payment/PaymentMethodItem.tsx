import { useStore } from "@/store/store";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  item: { id: number; title: string; description: string; image: string };
}

const PaymentMethodItem: FC<IProps> = ({ item }) => {
  const { activePaymentIndex, setActivePaymentIndex } = useStore(
    (state) => state
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setActivePaymentIndex(item.id);
    }
  };

  return (
    <div
      onClick={() => {
        setActivePaymentIndex(item.id);
      }}
      className={`flex items-center gap-5 rounded-lg p-3 cursor-pointer bg-white ${
        item.id === activePaymentIndex ? "shadow-3xl" : "border"
      }`}
    >
      <div
        className={`flex items-center gap-1 h-full px-3 rounded ${
          item.id === activePaymentIndex && "bg-blue-50"
        }`}
      >
        <input
          type="radio"
          className="w-5 h-5"
          checked={item.id === activePaymentIndex}
          onChange={handleRadioChange}
        />
      </div>

      <Image
        src={item.image}
        alt={item.title}
        title={item.title}
        width={80}
        height={80}
        className="object-cover w-20 h-full"
      />

      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-black">{item.title}</h4>
        <p className="text-sm">{item.description}</p>
      </div>
    </div>
  );
};

export default PaymentMethodItem;
