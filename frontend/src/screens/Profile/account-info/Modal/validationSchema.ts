import * as Yup from "yup";

const cardNumberRegex = /^(?:\d[ -]*?){13,16}$/;
const mobileNumberRegex =
  /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

const validationSchema = (
  showEditName: boolean,
  showEditEmail: boolean,
  showEditPassword: boolean,
  showEditNationalCode: boolean,
  showEditCardNumber: boolean,
  showEditMobile: boolean
) => {
  return Yup.object().shape({
    firstName: showEditName
      ? Yup.string().required("نام الزامی است")
      : Yup.string(),
    lastName: showEditName
      ? Yup.string().required("نام خانوادگی الزامی است")
      : Yup.string(),
    email: showEditEmail
      ? Yup.string()
          .email("فرمت ایمیل نامعتبر است")
          .required("ایمیل الزامی است")
      : Yup.string().email("فرمت ایمیل نامعتبر است"),
    currentPassword: showEditPassword
      ? Yup.string().required("رمز عبور فعلی الزامی است")
      : Yup.string(),
    newPassword: showEditPassword
      ? Yup.string()
          .required("رمز عبور جدید الزامی است")
          .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
          .max(18, "رمز عبور باید حداکثر 18 کاراکتر باشد")
      : Yup.string(),
    repeatNewPassword: showEditPassword
      ? Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "تکرار رمز عبور باید با رمز عبور جدید مطابقت داشته باشد"
        )
      : Yup.string(),
    mobile: showEditMobile
      ? Yup.string()
          .required("شماره موبایل الزامی است")
          .matches(mobileNumberRegex, "فرمت شماره موبایل معتبر نیست")
      : Yup.string(),
    nationalCode: showEditNationalCode
      ? Yup.string().required("کد ملی الزامی است")
      : Yup.string(),
    cardNumber: showEditCardNumber
      ? Yup.string()
          .required("شماره کارت الزامی است")
          .matches(cardNumberRegex, "فرمت شماره کارت معتبر نیست")
      : Yup.string(),
  });
};

export default validationSchema;
