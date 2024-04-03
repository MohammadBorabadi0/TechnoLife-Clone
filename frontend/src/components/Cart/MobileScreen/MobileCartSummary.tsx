import { En_To_Fa, calculateCartSummary } from "@/utils/functions";
import { ICart } from "@/utils/type";
import { FC } from "react";

interface IProps {
  cartItems: [] | ICart[];
}

const MobileCartSummary: FC<IProps> = ({ cartItems }) => {
  const { totalDiscountAmount, totalPrices, totalPricesAfterDiscount } =
    calculateCartSummary(cartItems);

  return (
    <div className="flex flex-1 flex-col gap-5 px-3 py-6 mt-5 bg-[#f6f6f6] text-sm border-y">
      <h3 className="text-black text-base font-semibold">صورتحساب</h3>
      <div className="flex justify-between items-center">
        <span>قیمت محصولات</span>
        <p className="flex items-center gap-1">
          {En_To_Fa(`${totalPrices.toLocaleString("fa-IR")}`)}
          <span>تومان</span>
        </p>
      </div>
      <div className="flex justify-between items-center text-red-600">
        <span>تخفیف محصولات</span>
        <p className="flex items-center gap-1">
          {En_To_Fa(`${totalDiscountAmount.toLocaleString("fa-IR")}`)}
          <span>تومان</span>
        </p>
      </div>
      <div className="flex justify-between items-center text-black">
        <span>جمع کل</span>
        <p className="flex items-center gap-1">
          {En_To_Fa(`${totalPricesAfterDiscount.toLocaleString("fa-IR")}`)}
          <span>تومان</span>
        </p>
      </div>
    </div>
  );
};

export default MobileCartSummary;
