"use client";

import ContinueShoppingButton from "@/components/Shipment/Edited/ContinueShoppingButton";
import DeliveryAddressMobile from "@/components/Shipment/Edited/DeliveryAddressMobile";
import DeliveryMethod from "@/components/Shipment/Edited/DeliveryMethod";
import SelectCompany from "@/components/Shipment/Edited/SelectCompany";
import OrderList from "@/components/Shipment/OrderList";
import OrderSummary from "@/components/Shipment/OrderSummary";
import AddressForm from "@/components/Shipment/ShipmentAddressForm/AddressForm";
import ShowAddress from "@/components/Shipment/ShowAddedAddress/ShowAddress";
import {
  useCartStore,
  useModal,
  useShipmentStore,
  useStore,
} from "@/store/store";

const ShipmentMobileScreen = () => {
  const { addressFormValues } = useShipmentStore((state) => state);
  const { activeTimeIndex, sendCompanyIndex } = useStore((state) => state);
  const { cartItems } = useCartStore((state) => state);

  const { showAddAddressForm, showAddress } = useModal((state) => state);

  // Destructuring addressFormValues
  const { firstname } = addressFormValues;

  return (
    <div className="flex lg:hidden flex-col gap-5 my-5">
      <div className="mx-3">
        {/* Show Address Or Add Address  */}
        <DeliveryAddressMobile />

        {/* Order List  */}
        <OrderList cartItems={cartItems} />

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
      <OrderSummary cartItems={cartItems} />

      {/* Button For Continue Shopping Button */}
      <ContinueShoppingButton
        cartItems={cartItems}
        activeTimeIndex={activeTimeIndex}
      />

      {showAddAddressForm && <AddressForm />}
      {showAddress && <ShowAddress />}
    </div>
  );
};

export default ShipmentMobileScreen;
