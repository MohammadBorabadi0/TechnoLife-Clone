"use client";

import EmptyCart from "@/components/Cart/MobileScreen/EmptyCart";
import CartMobileScreen from "@/screens/Cart/CartMobileScreen";
import CartScreen from "@/screens/Cart/CartScreen";
import { useCartStore } from "@/store/store";

const CartPage = () => {
  const { cartItems } = useCartStore((state) => state);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section>
      <div className="hidden lg:block bg-[#FCFEFF]">
        <CartScreen cartItems={cartItems} />
      </div>
      <div className="block lg:hidden">
        <CartMobileScreen cartItems={cartItems} />
      </div>
    </section>
  );
};

export default CartPage;
