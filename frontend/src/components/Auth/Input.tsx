import { ErrorMessage, Field } from "formik";
import { FC } from "react";
import { LuBadgeAlert } from "react-icons/lu";

interface IProps {
  type?: string;
  name: string;
  placeholder: string;
}

const Input: FC<IProps> = ({ type = "text", name, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <Field
        type={type}
        name={name}
        className="border flex-1 p-2 rounded-sm"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div className="flex items-center gap-2 text-xs text-red-600">
            <LuBadgeAlert size={16} />
            {msg}
          </div>
        )}
      />
    </div>
  );
};

export default Input;
