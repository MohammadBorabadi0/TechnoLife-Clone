import {
  En_To_Fa,
  convertToPersianDate,
  getStatusText,
} from "@/utils/functions";
import { IOrder } from "@/utils/type";
import { FC } from "react";

interface IProps {
  order: IOrder;
}

const OrderDetails: FC<IProps> = ({ order }) => {
  // Convert CreatedAt to Persian Date
  const persianDate = convertToPersianDate(order.createdAt!).persianDate;
  const persianDayOfWeek = convertToPersianDate(
    order.createdAt!
  ).persianDayOfWeek;

  // Get Order Status
  const { bgColor, text, textColor } = getStatusText(
    order?.paymentResult.status!
  );

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-8 flex-wrap px-3">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 items-center gap-5">
          <p>قیمت محصولات</p>
          <p className="text-black font-semibold">
            {En_To_Fa(`${order.totalPrices?.toLocaleString("fa-IR")}`)}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <p>تخفیف محصولات</p>
          <p className="text-black font-semibold">
            {En_To_Fa(`${order.totalDiscountAmount?.toLocaleString("fa-IR")}`)}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <p>قیمت محصولات بعد از محاسبه تخفیف</p>
          <p className="text-black font-semibold">
            {En_To_Fa(
              `${order.totalPricesAfterDiscount?.toLocaleString("fa-IR")}`
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <p>تعداد کالا</p>
          <p className="text-black font-semibold">
            {En_To_Fa(`${order.orderItems.length}`)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 xl:mr-10">
        <div className="grid grid-cols-2 items-center gap-5">
          <p>تاریخ ثبت سفارش</p>
          <p className="text-black text-sm font-semibold">
            {`${persianDayOfWeek} ${persianDate}`}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <p>هزینه بسته بندی و ارسال</p>
          <p className="text-black text-sm font-semibold">
            {En_To_Fa(`${order.shippingCost?.toLocaleString("fa-IR")}`)}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <p>مبلغ کل سفارش</p>
          <p className="text-black text-sm font-semibold">
            {order.totalPricesAfterDiscount && order.shippingCost
              ? En_To_Fa(
                  `${(
                    order.totalPricesAfterDiscount + order.shippingCost
                  ).toLocaleString("fa-IR")}`
                )
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <p>وضعیت سفارش</p>
          <p
            className="text-center px-2 py-1 rounded-lg"
            style={{ color: textColor, backgroundColor: bgColor }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
