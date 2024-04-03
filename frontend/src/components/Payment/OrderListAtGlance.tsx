import { En_To_Fa, calculateCartSummary } from "@/utils/functions";
import { ICart } from "@/utils/type";
import Image from "next/image";
import { FC, useState } from "react";
import { HiOutlineCreditCard } from "react-icons/hi";
import { LuCalendarDays } from "react-icons/lu";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import OrderList from "./OrderList";

interface IProps {
  cartItems: [] | ICart[];
}

const OrderListAtGlance: FC<IProps> = ({ cartItems }) => {
  const [showMore, setShowMore] = useState(false);
  const { totalPricesAfterDiscount, shippingCost } =
    calculateCartSummary(cartItems);

  return (
    <div className="flex flex-col gap-5 py-5">
      {/* Title  */}
      <h3 className="text-black xl:text-lg font-semibold mx-2">
        سفارش در یک نگاه
      </h3>
      <div className="border-2 rounded-lg py-4 px-6 bg-white text-sm">
        <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between pb-7 mb-5 border-b">
          <div className="flex flex-col xl:flex-row gap-3 xl:gap-10">
            <div className="flex items-center gap-2">
              <Image
                src="/images/shipment-delivery.webp"
                alt="shipment-delivery"
                width={30}
                height={30}
              />
              <p className="text-yellow-600 font-semibold">
                ارسال سریع تکنولایف
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LuCalendarDays size={18} />
              <p>جمعه 18 اسفند 1402 . ساعت ۹ تا ۱۳</p>
              <span className="border px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs">
                {En_To_Fa(`${cartItems.length}`)} کالا
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 h-fit">
            <HiOutlineCreditCard size={20} />
            <span>مجموع مبلغ محصولات : </span>
            <span className="font-semibold text-black">
              {En_To_Fa(`${totalPricesAfterDiscount.toLocaleString("fa-IR")}`)}
            </span>
            <span className="text-xs">تومان</span>
          </div>
        </div>

        {/* Order List And More Details */}
        {showMore ? (
          <>
            <p>
              هزینه بسته بندی و ارسال:{" "}
              {En_To_Fa(`${shippingCost.toLocaleString("fa-IR")}`)} تومان
            </p>

            <OrderList cartItems={cartItems} />
          </>
        ) : null}

        {/* Show Or Hidden More Button  */}
        <div className="flex justify-center sm:py-5 text-xs sm:text-base">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-1 text-blue-600"
          >
            {showMore ? (
              <>
                <span>بستن جزئیات سفارش</span>
                <BiChevronUp size={20} />
              </>
            ) : (
              <>
                <span>نمایش جزئیات سفارش</span>
                <BiChevronDown size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderListAtGlance;
