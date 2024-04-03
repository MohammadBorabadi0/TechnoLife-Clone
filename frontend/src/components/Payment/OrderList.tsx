import { FC } from "react";

// components
import OrderItem from "../Shipment/OrderItem";

// types
import { ICart } from "@/utils/type";

interface IProps {
  cartItems: [] | ICart[];
}

const OrderList: FC<IProps> = ({ cartItems }) => {
  return (
    <div className="flex gap-10 rounded-lg py-8 px-3 overflow-x-auto">
      {cartItems.map((cartItem) => (
        <OrderItem key={cartItem.productId} cartItem={cartItem} />
      ))}
    </div>
  );
};

export default OrderList;
