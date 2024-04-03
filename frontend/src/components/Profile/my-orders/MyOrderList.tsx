import { IOrder } from "@/utils/type";
import { FC } from "react";
import MyOrderItem from "./MyOrderItem";
import EmptyMyOrders from "../EmptyMyOrders";

interface IProps {
  orders: IOrder[] | null;
}

const MyOrderList: FC<IProps> = ({ orders }) => {

  return (
    <section className="flex flex-col gap-8">
      {orders && orders.length > 0 ? (
        orders.map((order) => <MyOrderItem key={order._id} order={order} />)
      ) : (
        <>
          {/* IF Empty My Orders  */}
          <EmptyMyOrders />
        </>
      )}
    </section>
  );
};

export default MyOrderList;
