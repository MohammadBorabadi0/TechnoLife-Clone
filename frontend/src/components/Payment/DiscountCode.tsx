import React from "react";
import { GoPlus } from "react-icons/go";
import { TbDiscount2 } from "react-icons/tb";

const DiscountCode = () => {
  return (
    <div className="flex flex-col gap-5 py-5">
      {/* Title  */}
      <h3 className="text-black xl:text-lg font-semibold mx-2">
        کد تخفیف یا کارت هدیه
      </h3>

      <div className="flex items-center gap-2 text-red-500 text-sm">
        <TbDiscount2 className="text-xl sm:text-2xl" />
        <p>ثبت کد تخفیف یا کارت هدیه</p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="کد موردنظر را وارد کنید"
          className="border rounded text-sm bg-white w-[90%] lg:w-80 h-10 sm:h-12 px-4 outline-none"
        />
        <button className="flex text-xs sm:text-sm whitespace-nowrap items-center gap-2 sm:gap-4 text-blue-600 border-2 border-blue-600 h-10 sm:h-12 rounded px-3">
          <span>ثبت کد</span>
          <GoPlus className="text-lg sm:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default DiscountCode;
