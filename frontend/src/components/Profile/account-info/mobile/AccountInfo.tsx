import { useModal } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { IUser } from "@/utils/type";
import { FC } from "react";
import { FaChevronLeft } from "react-icons/fa";

interface IProps {
  userProfile: IUser;
}

const AccountInfo: FC<IProps> = ({ userProfile }) => {
  const {
    setShowEditName,
    setShowEditEmail,
    setShowEditMobile,
    setShowEditNationalCode,
    setShowEditCardNumber,
    setShowEditPassword,
  } = useModal((state) => state);

  return (
    <div className="flex flex-col gap-3 text-sm px-1 my-5">
      <div
        className="flex items-center justify-between border-b pb-3"
        onClick={() => setShowEditName(true)}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-black font-semibold">نام و نام خانوادگی</h4>
          <p className="text-gray-500">
            {userProfile.firstName} {userProfile.lastName}
          </p>
        </div>

        <FaChevronLeft className=" text-yellow-custom" />
      </div>
      <div
        className="flex items-center justify-between border-b pb-3"
        onClick={() => setShowEditEmail(true)}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-black font-semibold">پست الکترونیکی</h4>
          <p className="text-gray-500">{userProfile.email}</p>
        </div>
        <FaChevronLeft className="text-yellow-custom" />
      </div>
      <div
        className="flex items-center justify-between border-b pb-3"
        onClick={() => setShowEditMobile(true)}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-black font-semibold">شماره موبایل</h4>
          <p className="text-gray-500">
            {En_To_Fa(`${userProfile.mobile || ""}`)}
          </p>
        </div>
        <FaChevronLeft className=" text-yellow-custom" />
      </div>
      <div
        className="flex items-center justify-between border-b pb-3"
        onClick={() => setShowEditNationalCode(true)}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-black font-semibold">کد ملی</h4>
          <p className="text-gray-500">
            {En_To_Fa(`0${userProfile.nationalCode || ""}`)}
          </p>
        </div>
        <FaChevronLeft className=" text-yellow-custom" />
      </div>
      <div
        className="flex items-center justify-between border-b pb-3"
        onClick={() => setShowEditPassword(true)}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-black font-semibold">رمز عبور</h4>
          <p className="text-gray-500">******</p>
        </div>
        <FaChevronLeft className=" text-yellow-custom" />
      </div>
      <div
        className="flex items-center justify-between border-b pb-3"
        onClick={() => setShowEditCardNumber(true)}
      >
        <div className="flex flex-col gap-2">
          <h4 className="text-black font-semibold">شماره کارت</h4>
          <p className="text-gray-500">
            {En_To_Fa(
              `${
                userProfile.cardNumber
                  ?.toString()
                  .match(/\d{1,4}/g)
                  ?.join("-") || ""
              }`
            )}
          </p>
        </div>
        <FaChevronLeft className=" text-yellow-custom" />
      </div>
    </div>
  );
};

export default AccountInfo;
