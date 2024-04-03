import { En_To_Fa, calculateCartSummary } from "@/utils/functions";
import { ICart } from "@/utils/type";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

interface IProps {
  cartItems: [] | ICart[];
  activeTimeIndex: number | null;
}

const ContinueShoppingButton: FC<IProps> = ({ cartItems, activeTimeIndex }) => {
  const { totalPricesAfterDiscount, shippingCost } =
    calculateCartSummary(cartItems);

  const router = useRouter();

  return (
    <div className="flex lg:hidden justify-center items-center text-sm font-semibold fixed left-0 right-0 bottom-0 h-20 bg-[#f6f6f6] border-t">
      {activeTimeIndex !== null ? (
        <button
          className="flex items-center justify-evenly text-white bg-green-custom flex-1 h-12 mx-6 rounded-xl"
          onClick={() => router.push("/payment")}
        >
          <span>تایید و ادامه</span>
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
      ) : (
        <button
          onClick={() => toast("لطفا شیوه و زمان ارسال را تعیین کنید")}
          className="flex items-center justify-center text-gray-400 border-2 bg-[#f6f6f6] flex-1 h-12 mx-6 rounded-xl"
        >
          شیوه و زمان ارسال را انتخاب کنید
        </button>
      )}
    </div>
  );
};

export default ContinueShoppingButton;
