import Image from "next/image";
import { BiChevronLeft } from "react-icons/bi";
import { TbDiscount2 } from "react-icons/tb";

const EmptyCart = () => {
  return (
    <div className="flex flex-col gap-5 m-5">
      <h1 className="text-black text-lg font-semibold px-3">سبد خرید</h1>
      <div className="grid place-items-center gap-5 sm:border-2 rounded-xl py-10">
        <Image
          src="/images/static_emptyBasket.webp"
          alt="emptyBasket"
          width={300}
          height={300}
        />

        <div className="flex flex-col items-center gap-4 text-sm sm:text-xl">
          <p className="text-black font-semibold">سبد خرید شما خالیه !</p>
          <p>برای مشاهده تخفیف‌های امروز، روی لینک زیر کلیک کنید.</p>
        </div>

        <div className="flex items-center mt-10 text-sm sm:text-base">
          <TbDiscount2 className="text-red-600 text-xl sm:text-3xl ml-1" />
          <span className="text-blue-600 font-medium">
            بیشترین تخفیف های امروز
          </span>
          <BiChevronLeft size={20} className="text-blue-600" />
        </div>
      </div>
      {/* Border */}
      <span className="block sm:hidden border-y py-[1px]"></span>
    </div>
  );
};

export default EmptyCart;
