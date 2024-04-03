import { paymentMethodsData, sendCompanyData } from "@/data/data";
import {
  useCartStore,
  useOrderStore,
  useShipmentStore,
  useStore,
} from "@/store/store";
import { En_To_Fa, calculateCartSummary } from "@/utils/functions";
import { ICart } from "@/utils/type";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

interface IProps {
  cartItems: [] | ICart[];
  activeTimeIndex: number | null;
}

const OrderSummary: FC<IProps> = ({ cartItems, activeTimeIndex }) => {
  const { addOrder } = useOrderStore((state) => state);
  const { removeAllCartItems } = useCartStore((state) => state);
  const { addressFormValues } = useShipmentStore((state) => state);
  const {
    sendCompanyIndex,
    activePaymentIndex,
    setActiveDayIndex,
    setActivePaymentIndex,
    setSendCompanyIndex,
  } = useStore((state) => state);

  const { totalPricesAfterDiscount, shippingCost } =
    calculateCartSummary(cartItems);

  const router = useRouter();
  const pathname = usePathname();

  // handle Add Order
  const handleAddOrder = async () => {
    const {
      province,
      city,
      housenumber,
      postalAddress,
      postalCode,
      phonenumber,
      quarter,
    } = addressFormValues;

    const orderItems = cartItems.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount || 0,
      color: item.colorId,
    }));

    const findSendCompany = sendCompanyData.find(
      (company) => company.id === sendCompanyIndex
    );

    const findPaymentMethod = paymentMethodsData.find(
      (company) => company.id === activePaymentIndex
    );

    try {
      addOrder({
        paymentMethod: findPaymentMethod?.title || "",
        sendCompany: findSendCompany?.name || "",
        paymentResult: { status: "processing" },
        shippingAddress: {
          province,
          city,
          postalAddress,
          postalCode,
          houseNumber: housenumber,
          quarter,
          phoneNumber: phonenumber.toString(),
        },
        orderItems,
      });

      // set activeItems to default
      setActiveDayIndex(0);
      setActivePaymentIndex(0);
      setSendCompanyIndex(0);

      // remove all cart items 
      removeAllCartItems();

      // router.push("/profile");
      // removeAllCartItems();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <section className="bg-white">
      <h3 className="text-black xl:text-lg font-semibold mx-2">صورتحساب</h3>
      <div className="flex flex-col gap-5 shadow-3xl p-5 my-3 rounded-lg text-sm">
        <div className="flex justify-between items-center">
          <p>قیمت محصولات</p>
          <p className="flex items-center gap-1">
            {En_To_Fa(`${totalPricesAfterDiscount.toLocaleString("fa-IR")}`)}
            <span className="text-xs">تومان</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>هزینه بسته بندی و ارسال</p>
          <p className="flex items-center gap-1">
            {En_To_Fa(`${shippingCost.toLocaleString("fa-IR")}`)}
            <span className="text-xs">تومان</span>
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center text-black font-semibold">
          <p>مبلغ قابل پرداخت</p>
          <p className="flex items-center gap-1">
            {En_To_Fa(
              `${(totalPricesAfterDiscount + shippingCost).toLocaleString(
                "fa-IR"
              )}`
            )}
            <span className="text-xs font-medium">تومان</span>
          </p>
        </div>

        {pathname === "/shipment" ? (
          <>
            {/* Button For Continue Shopping Button */}
            <div className="flex justify-center items-center text-base mt-3 mb-1">
              {activeTimeIndex !== null ? (
                <button
                  className="flex items-center justify-evenly text-white bg-green-custom flex-1 py-3 rounded-xl"
                  onClick={() => router.push("/payment")}
                >
                  <span>تایید و ادامه</span>
                  <span className="text-lg">|</span>
                  <div className="flex items-center gap-1">
                    {En_To_Fa(
                      `${(
                        totalPricesAfterDiscount + shippingCost
                      ).toLocaleString("fa-IR")}`
                    )}
                    <span className="text-xs">تومان</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => toast("لطفا شیوه و زمان ارسال را تعیین کنید")}
                  className="flex items-center justify-center text-gray-400 border flex-1 py-3 rounded-xl"
                >
                  شیوه و زمان ارسال را انتخاب کنید
                </button>
              )}
            </div>
          </>
        ) : (
          <button
            className="flex items-center justify-evenly text-white bg-green-custom flex-1 py-3 rounded-xl"
            onClick={handleAddOrder}
          >
            پرداخت
          </button>
        )}
      </div>
    </section>
  );
};

export default OrderSummary;
