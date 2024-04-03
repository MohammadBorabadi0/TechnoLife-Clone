import { FC } from "react";
import Link from "next/link";

// components
import OrderItem from "./OrderItem";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";

// utils
import { En_To_Fa } from "@/utils/functions";

// types
import { ICart } from "@/utils/type";

// icons
import { BiChevronLeft } from "react-icons/bi";

interface IProps {
  cartItems: [] | ICart[];
}

const OrderList: FC<IProps> = ({ cartItems }) => {
  return (
    <section className="flex flex-col gap-5 text-sm">
      {/* Order List Title */}
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center gap-3">
          <h3 className="text-black lg:text-lg font-semibold mx-2">
            سفارش شما
          </h3>
          <span className="text-xs sm:text-sm">
            {En_To_Fa(`${cartItems.length}`)} عدد کالا
          </span>
        </div>
        <Link href="/cart" className="flex items-center text-blue-600">
          <span>بازگشت به سبد خرید</span>
          <BiChevronLeft size={20} />
        </Link>
      </div>

      {/* Order List Section  */}
      <div className="border rounded-lg mt-3 mb-10">
        <div className="flex overflow-x-auto gap-10 rounded-lg py-8 px-5">
          {cartItems.map((cartItem) => (
            <OrderItem key={cartItem.productId} cartItem={cartItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderList;
