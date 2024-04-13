import { useModal } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { IUser } from "@/utils/type";
import { FC } from "react";
import { FiEdit2 } from "react-icons/fi";

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
    <div className="grid grid-cols-3 gap-10 bg-gray-100 rounded-lg p-7 my-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <h4 className="text-gray-500">نام و نام خانوادگی</h4>
          <p className="text-black">
            {userProfile.firstName} {userProfile.lastName}
          </p>
        </div>
        <button className="text-blue-600" onClick={() => setShowEditName(true)}>
          <FiEdit2 className="text-lg" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <h4 className="text-gray-500">پست الکترونیکی</h4>
          <p className="text-black">{userProfile.email}</p>
        </div>
        <button
          className="text-blue-600"
          onClick={() => setShowEditEmail(true)}
        >
          <FiEdit2 className="text-lg" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <h4 className="text-gray-500">شماره موبایل</h4>
          <p className="text-black">
            {En_To_Fa(`0${userProfile.mobile || ""}`)}
          </p>
        </div>
        <button
          className="text-blue-600"
          onClick={() => setShowEditMobile(true)}
        >
          <FiEdit2 className="text-lg" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <h4 className="text-gray-500">کد ملی</h4>
          <p className="text-black">
            {En_To_Fa(`0${userProfile.nationalCode || ""}`)}
          </p>
        </div>
        <button
          className="text-blue-600"
          onClick={() => setShowEditNationalCode(true)}
        >
          <FiEdit2 className="text-lg" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <h4 className="text-gray-500">رمز عبور</h4>
          <p className="text-black">******</p>
        </div>
        <button
          className="text-blue-600"
          onClick={() => setShowEditPassword(true)}
        >
          <FiEdit2 className="text-lg" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 font-semibold">
          <h4 className="text-gray-500">شماره کارت</h4>
          <p className="text-black">
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
        <button
          className="text-blue-600"
          onClick={() => setShowEditCardNumber(true)}
        >
          <FiEdit2 className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
