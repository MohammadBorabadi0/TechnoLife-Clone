import Link from "next/link";
import PaymentMethodItem from "./PaymentMethodItem";
import { BiChevronLeft } from "react-icons/bi";
import { paymentMethodsData } from "@/data/data";

const PaymentMethods = () => {
  return (
    <>
      {/* Title  */}
      <div className="flex justify-between items-center">
        <h3 className="text-black xl:text-lg font-semibold mx-2">
          انتخاب شیوه پرداخت
        </h3>
        <Link
          href="/shipment"
          className="flex items-center gap-1 text-blue-600"
        >
          <span>بازگشت به شیوه زمان و ارسال</span>
          <BiChevronLeft size={20} />
        </Link>
      </div>

      {/* Payment Methods List  */}
      <div className="flex flex-col gap-5 mb-5">
        {paymentMethodsData.slice(0, 4).map((item) => (
          <PaymentMethodItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default PaymentMethods;
