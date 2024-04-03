"use client";

import { useOrderStore } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import Title from "@/components/Admin/Title";
import OrderItem from "@/components/Admin/edit/order/OrderItem";
import SelectOrderStatus from "@/components/Admin/edit/order/SelectOrderStatus";
import {
  En_To_Fa,
  convertToPersianDate,
  getStatusText,
} from "@/utils/functions";
import OrderDetails from "@/components/Profile/my-orders/OrderDetails";

const EditOrderScreen = () => {
  const { order, status, fetchOrder, updateOrderStatus } = useOrderStore(
    (state) => state
  );

  const { orderId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (orderId) fetchOrder(orderId.toString());
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (order && order._id) {
      updateOrderStatus(status, order?._id);
      router.push("/admin/orders");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Title title={`سفارش ${order?._id}`} />

      {order && <OrderDetails order={order} />}

      {/* Order Items  */}
      <div className="flex gap-10 rounded-lg py-8 px-4 overflow-x-auto bg-gray-50 shadow-3xl">
        {order?.orderItems.map((item) => (
          <OrderItem key={item.product} order={order} item={item} />
        ))}
      </div>

      <span className="border-b border-dashed block"></span>

      {order && <SelectOrderStatus order={order} />}
      <Button text="ویرایش سفارش" />
    </form>
  );
};

export default EditOrderScreen;
