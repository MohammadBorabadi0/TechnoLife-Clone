"use client";

import DiscountCode from "@/components/Payment/DiscountCode";
import OrderListAtGlance from "@/components/Payment/OrderListAtGlance";
import PaymentInstallmentMethods from "@/components/Payment/PaymentInstallmentMethods";
import PaymentMethods from "@/components/Payment/PaymentMethods";
import OrderSummary from "@/components/Shipment/Edited/OrderSummary";
import ShipmentHeader from "@/components/Shipment/Edited/ShipmentHeader";
import { useCartStore, useStore } from "@/store/store";

const PaymentScreen = () => {
  const { activeTimeIndex } = useStore((state) => state);
  const { cartItems } = useCartStore((state) => state);

  return (
    <>
      <ShipmentHeader />

      {/* ------------------------------------------------------------------------------------------ */}

      {/* Select Payment Method  */}

      <div className="flex gap-8 px-5">
        <div className="flex flex-col gap-5 flex-3 w-[calc(100%-380px)] mb-10">
          {/* ------------------------------------------------------------------------------------------ */}

          <PaymentMethods />
          <PaymentInstallmentMethods />

          {/* Border  */}
          <span className="border-y-2 py-[1px]"></span>

          {/* Discount Code Section  */}
          <DiscountCode />

          {/* Border  */}
          <span className="border-y-2 py-[1px]"></span>

          <OrderListAtGlance cartItems={cartItems} />
        </div>

        {/* ------------------------------------------------------------------------------------------ */}

        {/* Payment Summary  */}

        <div className="hidden lg:block flex-1 min-w-[320px] max-w-[350px] h-fit sticky top-5 z-10">
          <OrderSummary
            cartItems={cartItems}
            activeTimeIndex={activeTimeIndex}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
