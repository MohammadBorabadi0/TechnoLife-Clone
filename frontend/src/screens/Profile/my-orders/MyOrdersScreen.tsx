import Tab from "@/components/Profile/Tab";
import Title from "@/components/Profile/Title";
import MyOrderList from "@/components/Profile/my-orders/MyOrderList";
import { IOrder } from "@/utils/type";
import { FC } from "react";

interface IProps {
  myOrders: IOrder[] | null;
  filteredOrders: IOrder[];
  handleFilterOrders: (status: string) => void;
}

const MyOrdersScreen: FC<IProps> = ({
  myOrders,
  handleFilterOrders,
  filteredOrders,
}) => {
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

export default MyOrdersScreen;
