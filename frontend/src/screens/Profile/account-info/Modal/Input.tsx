import { Field, ErrorMessage } from "formik";
import { FC } from "react";
import { BiErrorAlt } from "react-icons/bi";

interface IProps {
  label: string;
  type?: string;
  name: string;
  readOnly?: boolean;
}

const Input: FC<IProps> = ({ label, type, name, readOnly = false }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <Field
        type={type}
        name={name}
        readOnly={readOnly}
        maxLength={name === "cardNumber" ? 16 : null}
        className="bg-gray-100 p-2 outline-none rounded-sm"
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="flex items-center gap-1 text-xs text-red-500">
            <BiErrorAlt size={18} />
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default Input;
