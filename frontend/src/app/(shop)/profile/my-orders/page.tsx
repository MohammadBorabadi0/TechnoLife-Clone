"use client";

import Tab from "@/components/Profile/Tab";
import Title from "@/components/Profile/Title";
import MyOrderList from "@/components/Profile/my-orders/MyOrderList";
import { useOrderStore } from "@/store/store";
import { IOrder } from "@/utils/type";
import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const { myOrders, fetchMyOrders } = useOrderStore((state) => state);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);

  const handleFilterOrders = (status: string) => {
    if (myOrders) {
      const filteredOrders = myOrders.filter(
        (order) =>
          order.paymentResult.status.toLowerCase() === status.toLowerCase()
      );

      setFilteredOrders(filteredOrders);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  useEffect(() => {
    if (myOrders) {
      handleFilterOrders("awaiting payment");
    }
  }, [myOrders]);

  return (
    <div className="flex flex-col gap-6">
      <Title title="سفارش های من" />

      {/* Order Tabs */}
      <Tab orders={myOrders} handleFilterOrders={handleFilterOrders} />

      {/* MyOrderList */}
      <MyOrderList orders={filteredOrders} />
    </div>
  );
};

export default MyOrdersPage;
