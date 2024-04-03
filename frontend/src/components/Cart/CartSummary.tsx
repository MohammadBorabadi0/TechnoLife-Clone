import { useUserStore } from "@/store/store";
import { En_To_Fa, calculateCartSummary } from "@/utils/functions";
import { ICart } from "@/utils/type";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface IProps {
  cartItems: [] | ICart[];
}

const CartSummary: FC<IProps> = ({ cartItems }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [divPosition, setDivPosition] = useState(127);
  const { userProfile, fetchUser } = useUserStore((state) => state);

  // Calculate Needed Amounts
  const { totalDiscountAmount, totalPrices, totalPricesAfterDiscount } =
    calculateCartSummary(cartItems);

  const router = useRouter();

  // -----------------------------------------------

  // handle distance position sticky

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > scrollPosition) {
        setDivPosition(85);
      } else {
        setDivPosition(127);
      }
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // -----------------------------------------------------------------------

  // Fetch User Profile

  useEffect(() => {
    fetchUser;
  }, []);

  // ----------------------------------------------------------------

  const handlePushUser = () => {
    if (!userProfile) {
      router.push("/login?backTo=shipment");
    } else {
      router.push("/shipment");
    }
  };

  return (
    <div
      className="flex flex-col gap-3 text-sm sticky"
      style={{ top: divPosition + 15 }}
    >
      <h3 className="text-black text-base xl:text-lg font-semibold px-2">
        صورتحساب
      </h3>
      <div className="flex flex-col gap-5 px-3 xl:px-5 py-6 shadow-3xl rounded-xl font-semibold">
        <div className="flex justify-between items-center text-gray-500">
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
        <button
          onClick={handlePushUser}
          className="bg-green-custom text-white xl:text-base py-3 rounded-lg"
        >
          ادامه خرید
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
