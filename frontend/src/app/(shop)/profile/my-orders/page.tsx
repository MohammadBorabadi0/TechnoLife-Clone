"use client";

import MyOrdersScreen from "@/screens/Profile/my-orders/MyOrdersScreen";
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
    <MyOrdersScreen
      myOrders={myOrders}
      filteredOrders={filteredOrders}
      handleFilterOrders={handleFilterOrders}
    />
  );
};

export default MyOrdersPage;
