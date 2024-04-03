"use client";

import DiscountCode from "@/components/Payment/DiscountCode";
import OrderListAtGlance from "@/components/Payment/OrderListAtGlance";
import PayButton from "@/components/Payment/PaymentMobileScreen/PayButton";
import PaymentInstallmentMethods from "@/components/Payment/PaymentMobileScreen/PaymentInstallmentMethods";
import PaymentMethods from "@/components/Payment/PaymentMobileScreen/PaymentMethods";
import ContinueShoppingButton from "@/components/Shipment/Edited/ContinueShoppingButton";
import OrderSummary from "@/components/Shipment/OrderSummary";
import { useCartStore, useStore } from "@/store/store";

const PaymentMobileScreen = () => {
  const { cartItems } = useCartStore((state) => state);
  const { activeTimeIndex } = useStore((state) => state);

  return (
    <div className="flex flex-col gap-5 my-6 text-sm">
      <div className="flex flex-col gap-5 mx-3">
        <PaymentMethods />
        <PaymentInstallmentMethods />

        <span className="border-y py-[1px]"></span>
        <DiscountCode />
        <span className="border-y py-[1px]"></span>

        <OrderListAtGlance cartItems={cartItems} />
      </div>

      <OrderSummary cartItems={cartItems} />

      {/* Pay Button */}
      <PayButton cartItems={cartItems} />
    </div>
  );
};

export default PaymentMobileScreen;