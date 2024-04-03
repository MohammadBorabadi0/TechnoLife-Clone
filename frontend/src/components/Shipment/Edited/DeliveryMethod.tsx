import { sendCompanyData } from "@/data/data";
import Image from "next/image";
import React, { FC } from "react";
import { BiChevronUp, BiErrorAlt } from "react-icons/bi";

interface IProps {
  activeTimeIndex: number | null;
  sendCompanyIndex: number;
  firstname: string;
}

const DeliveryMethod: FC<IProps> = ({
  activeTimeIndex,
  sendCompanyIndex,
  firstname,
}) => {
  return (
    <>
      {firstname && firstname.trim() !== "" ? (
        <>
          <div className="flex items-center gap-2">
            <h4 className="text-black font-semibold">
              {activeTimeIndex !== null
                ? "شیوه و زمان ارسال"
                : "شیوه و زمان ارسال را انتخاب کنید"}
            </h4>
            <div
              className={`text-white text-xs px-2 py-1 rounded-full ${
                activeTimeIndex !== null ? "bg-yellow-custom" : "bg-gray-500"
              }`}
            >
              {activeTimeIndex !== null ? (
                <span>{`ارسال توسط ${sendCompanyData[sendCompanyIndex].name}`}</span>
              ) : (
                <span>تعیین نشده</span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center bg-green-100 border border-green-600 p-5 my-5 rounded-lg">
            <div className="flex items-center gap-5 text-black">
              <Image
                src="/images/static_home.webp"
                alt="static_home"
                width={50}
                height={50}
              />
              <span>تحویل به آدرس شما</span>
            </div>
            <BiChevronUp size={25} />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-5 bg-orange-100 border border-orange-600 p-3 lg:p-5 lg:my-10 rounded-lg lg:w-fit">
          <div className="flex items-center gap-3 text-orange-600 text-xs sm:text-sm lg:text-base">
            <BiErrorAlt className='text-lg sm:text-xl' />
            <p>برای انتخاب شیوه و زمان ارسال، ابتدا آدرس تحویل را ثبت کنید.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryMethod;
