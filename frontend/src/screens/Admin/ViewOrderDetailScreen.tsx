"use client";

import { useOrderStore } from "@/store/store";
import { En_To_Fa, convertToPersianDate } from "@/utils/functions";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Title from "@/components/Admin/Title";
import OrderDetails from "@/components/Profile/my-orders/OrderDetails";
import OrderItem from "@/components/Admin/edit/order/OrderItem";

const ViewOrderDetailScreen = () => {
  const { order, fetchOrder } = useOrderStore((state) => state);

  const { orderId } = useParams();

  // Destructure province and city from order.shippingAddress
  const {
    province,
    city,
    quarter,
    postalAddress,
    houseNumber,
    phoneNumber,
    postalCode,
  } = order?.shippingAddress || {};

  useEffect(() => {
    if (orderId) fetchOrder(orderId.toString());
  }, []);

  return (
    <section className="flex flex-col gap-5 text-gray-600 text-sm">
      <Title title={`سفارش ${order?._id || ""}`} link="/admin/orders" />

      {order && <OrderDetails order={order} />}

      {/* Order Items  */}
      <div className="flex flex-col gap-5 py-4 px-3 border-t border-dashed">
        <h3 className="text-lg text-black">محصولات موجود در سفارش</h3>
        <div className="flex gap-10 overflow-x-auto shadow-3xl p-5 rounded-lg">
          {order?.orderItems.map((item) => (
            <OrderItem key={item.product} order={order} item={item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 border-y py-5 px-3 border-dashed">
        <h3 className="text-lg text-black">آدرس گیرنده</h3>

        {order && (
          <>
            <p>
              شماره موبایل :{" "}
              <span className="text-black">{En_To_Fa(`${phoneNumber}`)}</span>
            </p>
            <p className="leading-9">
              {En_To_Fa(
                `${province} , ${city} - ${quarter} ، ${postalAddress} / پلاک ${houseNumber} / کد پستی ${postalCode}`
              )}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ViewOrderDetailScreen;
