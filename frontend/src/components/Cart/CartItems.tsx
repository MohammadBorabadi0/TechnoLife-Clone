import { ICart } from "@/utils/type";
import React, { FC } from "react";
import CartItem from "./CartItem";

interface IProps {
  cartItems: [] | ICart[];
}

const CartItems: FC<IProps> = ({ cartItems }) => {
  return (
    <div className="flex flex-col gap-5">
      {cartItems.map((item) => (
        <CartItem key={item.productId} cartItem={item} />
      ))}
    </div>
  );
};

export default CartItems;
