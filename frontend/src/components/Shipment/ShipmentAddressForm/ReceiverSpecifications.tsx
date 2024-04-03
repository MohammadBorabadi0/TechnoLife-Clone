import { ErrorMessage, Field } from "formik";
import { BiErrorAlt } from "react-icons/bi";

const ReceiverSpecifications = () => {
  return (
    <>
      <p className="text-black font-semibold mt-3 mb-2">
        مشخصات گیرنده را وارد کنید
      </p>
      <div className="flex flex-col gap-2">
        <label htmlFor="firstname" className="px-3">
          نام
        </label>
        <Field
          type="text"
          name="firstname"
          className="bg-[#f6f6f6] p-3 rounded-lg border"
        />
        <ErrorMessage name="firstname">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastname" className="px-3">
          نام خانوادگی
        </label>
        <Field
          type="text"
          name="lastname"
          className="bg-[#f6f6f6] p-3 rounded-lg border"
        />
        <ErrorMessage name="lastname">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="px-3">
          شماره تماس گیرنده
        </label>
        <Field
          type="number"
          name="phonenumber"
          className="bg-[#f6f6f6] p-3 rounded-lg border"
        />
        <ErrorMessage name="phonenumber">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
    </>
  );
};

export default ReceiverSpecifications;
