import { useStore } from "@/store/store";
import PaymentInstallmentItem from "./PaymentInstallmentMethodItem";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";

const paymentInstallmentMethodsData = [
  {
    title: "کیف پول ایزی پی ( خرید اقساطی )",
    description: "نیازمند ثبت نام در ایزی پی",
    image: "/images/paymentezpay.webp",
  },
  {
    title: "ازکی وام ( خرید اقساطی )",
    description: "نیازمند ورود در ازکی وام",
    image: "/images/azkivam.webp",
  },
];

const PaymentInstallmentMethods = () => {
  const { showPaymentInstallment, setShowPaymentInstallment } = useStore(
    (state) => state
  );
  return (
    <section className="flex flex-col gap-5 mb-6">
      {/* Title  */}
      <h3 className="text-black font-semibold mx-2">
        پرداخت اقساطی
      </h3>

      {showPaymentInstallment ? (
        <>
          {/* Payment Methods List  */}
          <div className="flex flex-col gap-5 mb-5">
            {paymentInstallmentMethodsData.map((item, index) => (
              <PaymentInstallmentItem key={index} index={index} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div
          onClick={() => setShowPaymentInstallment(true)}
          className="flex items-center gap-3 border-2 border-blue-600 text-blue-600 pr-5 pl-10 rounded-lg w-fit cursor-pointer"
        >
          <Image
            src="/images/static_refund-money.svg"
            alt="static_refund-money"
            title="static_refund-money"
            width={45}
            height={45}
            className="ml-4"
          />
          <span>نمایش پرداخت اقساطی</span>
          <BiChevronDown size={20} />
        </div>
      )}
    </section>
  );
};

export default PaymentInstallmentMethods;
