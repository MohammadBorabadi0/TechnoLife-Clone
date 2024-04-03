"use client";

import DeliveryAddress from "@/components/Shipment/Edited/DeliveryAddress";
import DeliveryMethod from "@/components/Shipment/Edited/DeliveryMethod";
import OrderSummary from "@/components/Shipment/Edited/OrderSummary";
import SelectCompany from "@/components/Shipment/Edited/SelectCompany";
import ShipmentHeader from "@/components/Shipment/Edited/ShipmentHeader";
import OrderList from "@/components/Shipment/OrderList";
import AddAddressModal from "@/components/Shipment/ShipmentModal/AddAddressModal";
import ShowAddressessModal from "@/components/Shipment/ShipmentModal/ShowAddressessModal";
import {
  useCartStore,
  useModal,
  useShipmentStore,
  useStore,
} from "@/store/store";

const ShipmentScreen = () => {
  const { addressFormValues } = useShipmentStore((state) => state);
  const { activeTimeIndex, sendCompanyIndex } = useStore((state) => state);
  const { cartItems } = useCartStore((state) => state);

  const { showAddAddressForm, showAddress } = useModal((state) => state);

  // Destructuring addressFormValues
  const { firstname } = addressFormValues;

  return (
    <section className="hidden lg:flex flex-col text-sm xl:text-base">
      <ShipmentHeader />
      <div className="flex gap-8 mx-5">
        <div className="flex-3 w-[calc(100%-380px)]">
          {/* Show Address Or Add Address  */}
          <DeliveryAddress />

          {firstname ? (
            <>
              {/* Order List  */}
              <OrderList cartItems={cartItems} />
            </>
          ) : null}

          {/* Method And Time Sending */}
          <DeliveryMethod
            activeTimeIndex={activeTimeIndex}
            sendCompanyIndex={sendCompanyIndex}
            firstname={firstname}
          />

          {/* Select Day  */}
          <div className="my-8">{firstname ? <SelectCompany /> : null}</div>
        </div>

        {/* Order Summary  */}
        <div className="flex-1 min-w-[320px] max-w-[350px] h-fit sticky top-5 z-10">
          <OrderSummary
            cartItems={cartItems}
            activeTimeIndex={activeTimeIndex}
          />
        </div>
      </div>

      {showAddAddressForm && <AddAddressModal />}
      {showAddress && <ShowAddressessModal />}
    </section>
  );
};

export default ShipmentScreen;
