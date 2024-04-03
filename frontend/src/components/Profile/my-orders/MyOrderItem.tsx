import { En_To_Fa, convertToPersianDate } from "@/utils/functions";
import { IOrder } from "@/utils/type";
import { FC } from "react";
import ProductItem from "./ProductItem";

interface IProps {
  order: IOrder;
}

const MyOrderItem: FC<IProps> = ({ order }) => {
  const { persianDate, persianDayOfWeek } = convertToPersianDate(
    order.createdAt!
  );

  console.log({ order });

  return (
    <div className="flex flex-col gap-5 bg-gray-custom p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-black">
          {persianDayOfWeek} {persianDate} TLC-
          {order._id?.slice(0, 6).toUpperCase()}
        </div>
        <button className="text-blue-600 text-sm">مشاهده سفارش</button>
      </div>
      <div className="flex items-center gap-1 text-green-600 text-sm">
        <span>مبلغ کل :</span>
        <span>
          {En_To_Fa(
            `${order.totalPricesAfterDiscount?.toLocaleString("fa-IR")}`
          )}
        </span>
        <span>تومان</span>
      </div>
      <div className="flex items-center gap-10 px-3 overflow-y-hidden overflow-x-auto">
        {order.orderItems.map((item) => (
          <ProductItem key={item.product} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MyOrderItem;
