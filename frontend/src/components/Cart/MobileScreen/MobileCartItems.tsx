import { ICart } from "@/utils/type";
import React, { FC } from "react";
import CartItem from "./MobileCartItem";

interface IProps {
  cartItems: [] | ICart[];
}

const CartItems: FC<IProps> = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.productId} cartItem={item} />
      ))}
    </div>
  );
};

export default CartItems;
