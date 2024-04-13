import Input from "./Input";
import { useModal } from "@/store/store";

const EditAccountFields = ({}) => {
  const {
    showEditName,
    showEditEmail,
    showEditPassword,
    showEditNationalCode,
    showEditCardNumber,
    showEditMobile,
  } = useModal((state) => state);

  return (
    <>
      {showEditName && (
        <>
          <Input label="نام" name="firstName" />
          <Input label="نام خانوادگی" name="lastName" />
        </>
      )}
      {showEditEmail && (
        <Input label="پست الکترونیکی" name="email" type="email" />
      )}
      {showEditPassword && (
        <>
          <Input
            label="رمز عبور فعلی"
            name="currentPassword"
            type="password"
            readOnly={true}
          />
          <Input label="رمز عبور جدید" name="newPassword" type="password" />
          <Input
            label="تکرار رمز عبور جدید"
            name="repeatNewPassword"
            type="password"
          />
        </>
      )}
      {showEditMobile && <Input label="شماره موبایل" name="mobile" />}
      {showEditNationalCode && <Input label="کد ملی" name="nationalCode" />}
      {showEditCardNumber && <Input label="شماره کارت" name="cardNumber" />}
    </>
  );
};

export default EditAccountFields;
