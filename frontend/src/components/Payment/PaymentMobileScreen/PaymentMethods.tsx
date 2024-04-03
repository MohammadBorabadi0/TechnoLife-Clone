import Link from "next/link";
import PaymentMethodItem from "./PaymentMethodItem";
import { BiChevronLeft } from "react-icons/bi";

const paymentMethodsData = [
  {
    title: "درگاه بانک ملت",
    description: "پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب",
    image: "/images/mellat.webp",
  },
  {
    title: "درگاه بانک ملی",
    description: "پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب",
    image: "/images/melli.webp",
  },
  {
    title: "تجارت الکترونیک پارسیان",
    description: "پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب",
    image: "/images/parsian.webp",
  },
  {
    title: "پرداخت در محل",
    description: "پرداخت وجه هنگام تحویل کالا",
    image: "/images/payment-pay-at-home.webp",
  },
];

const PaymentMethods = () => {
  return (
    <>
      {/* Title  */}
      <div className="flex justify-between items-center">
        <h3 className="text-black font-semibold mx-2">
          انتخاب شیوه پرداخت
        </h3>
        <Link
          href="/shipment"
          className="flex items-center gap-1 text-blue-600"
        >
          <span>بازگشت به شیوه زمان و ارسال</span>
          <BiChevronLeft size={18} />
        </Link>
      </div>

      {/* Payment Methods List  */}
      <div className="flex flex-col gap-5 mb-5">
        {paymentMethodsData.map((item, index) => (
          <PaymentMethodItem key={index} index={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default PaymentMethods;
