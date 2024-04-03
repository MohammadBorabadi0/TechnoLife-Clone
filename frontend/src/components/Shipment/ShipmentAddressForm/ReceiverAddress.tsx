import { ErrorMessage, Field } from "formik";
import { BiErrorAlt } from "react-icons/bi";

const ReceiverAddress = () => {
  return (
    <>
      <p className="text-black font-semibold mt-3 mb-2">
        آدرس گیرنده را وارد کنید
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="province" className="px-3">
          استان
        </label>
        <Field type="text" name="province" className="p-3 rounded-lg border" />
        <ErrorMessage name="province">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="city" className="px-3">
          شهر
        </label>
        <Field type="text" name="city" className="p-3 rounded-lg border" />
        <ErrorMessage name="city">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="quarter" className="px-3">
          محله
        </label>
        <Field type="text" name="quarter" className="p-3 rounded-lg border" />
        <ErrorMessage name="quarter">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="postalAddress" className="px-3">
          آدرس پستی
        </label>
        <Field
          type="text"
          name="postalAddress"
          className="p-3 rounded-lg border"
        />
        <ErrorMessage name="postalAddress">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="housenumber" className="px-3">
          پلاک
        </label>
        <Field
          type="text"
          name="housenumber"
          className="p-3 rounded-lg border"
        />
        <ErrorMessage name="housenumber">
          {(msg) => (
            <div className="text-red-500 text-xs flex items-center gap-1">
              <BiErrorAlt size={17} />
              <span className="mt-1">{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="postalCode" className="px-3">
          کد پستی
        </label>
        <Field
          type="text"
          name="postalCode"
          className="p-3 rounded-lg border"
        />
        <ErrorMessage name="postalCode">
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

export default ReceiverAddress;
