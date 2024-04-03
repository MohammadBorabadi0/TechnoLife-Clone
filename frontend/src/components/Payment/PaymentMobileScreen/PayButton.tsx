import { En_To_Fa, calculateCartSummary } from "@/utils/functions";
import { ICart } from "@/utils/type";
import { FC } from "react";

interface IProps {
  cartItems: [] | ICart[];
}

const PayButton: FC<IProps> = ({ cartItems }) => {
  const { totalPricesAfterDiscount, shippingCost } =
    calculateCartSummary(cartItems);

  return (
    <div className="flex lg:hidden justify-center items-center text-sm font-semibold fixed left-0 right-0 bottom-0 h-20 bg-[#f6f6f6] border-t">
      <button
        className="flex items-center justify-evenly text-white bg-green-custom flex-1 h-12 mx-6 rounded-xl"
      >
        <span>پرداخت</span>
        <span className="text-lg">|</span>
        <div className="flex items-center gap-1">
          {En_To_Fa(
            `${(totalPricesAfterDiscount + shippingCost).toLocaleString(
              "fa-IR"
            )}`
          )}
          <span className="text-xs">تومان</span>
        </div>
      </button>
    </div>
  );
};

export default PayButton;
