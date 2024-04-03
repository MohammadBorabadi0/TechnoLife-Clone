import { useProductStore } from "@/store/store";
import { En_To_Fa, convertToPersianDate } from "@/utils/functions";
import { IOrder } from "@/utils/type";
import Image from "next/image";
import { FC, useEffect } from "react";

interface IProps {
  order: IOrder;
  index: number;
}

const OrderItem: FC<IProps> = ({ order, index }) => {
  const { products, fetchProducts } = useProductStore((state) => state);
  const { persianDate, persianDayOfWeek } = convertToPersianDate(
    order.createdAt!
  );

  const findImage = products.find(
    (product) => product._id === order.orderItems[0].product
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex items-center gap-10 mt-5 text-gray-400">
        <div className="grid place-items-center bg-gray-custom text-black relative border shadow-xl min-h-[80px] min-w-[80px] rounded-full text-xl font-semibold opacity-80">
          {En_To_Fa(`${index}`)}
          <span className="h-1 w-10 absolute -left-10 bg-gray-custom"></span>
        </div>

        <section className="flex justify-between gap-5 whitespace-nowrap bg-gray-custom rounded-lg p-6 w-full">
          <div className="flex justify-between gap-8 flex-wrap">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <p>شماره سفارش</p>
                <p className="text-black font-semibold">
                  <span>TLC-</span>
                  <span>{order._id?.slice(0, 7).toLocaleUpperCase()}</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <p>مبلغ کل</p>
                <p className="text-black font-semibold">
                  {En_To_Fa(`${order.totalPricesAfterDiscount}`)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <p>تعداد کالا</p>
                <p className="text-black font-semibold">
                  {En_To_Fa(`${order.orderItems.length}`)}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 xl:mr-10">
              <div className="grid grid-cols-2 gap-5">
                <p>تاریخ ثبت سفارش</p>
                <p className="text-black text-sm font-semibold">
                  {persianDayOfWeek} {persianDate}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <p>وضعیت سفارش</p>
                <p
                  className={`font-semibold ${
                    order.paymentResult?.status === "waiting payment"
                      ? "text-blue-600"
                      : order.paymentResult?.status === "processing"
                      ? "text-yellow-custom"
                      : order.paymentResult?.status === "delivered"
                      ? "text-green-custom"
                      : order.paymentResult?.status === "returned"
                      ? "text-gray-500"
                      : order.paymentResult?.status === "canceled and suspended"
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  {order.paymentResult?.status === "awaiting payment"
                    ? "در انتظار پرداخت"
                    : order.paymentResult?.status === "processing"
                    ? "در حال پردازش"
                    : order.paymentResult?.status === "delivered"
                    ? "تحویل داده شده"
                    : order.paymentResult?.status === "returned"
                    ? "مرجوع شده"
                    : order.paymentResult?.status === "canceled and suspended"
                    ? "لغو شده"
                    : ""}
                </p>
              </div>
            </div>
          </div>
          {findImage && (
            <Image
              src={findImage?.images[0].file || ""}
              alt={findImage?.name || ""}
              width={100}
              height={100}
              className="w-24 h-24 object-cover"
            />
          )}
        </section>
      </div>
    </>
  );
};

export default OrderItem;