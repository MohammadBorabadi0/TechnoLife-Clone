import { ChangeEventHandler, FC } from "react";

interface InputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name="color"
      onChange={onChange}
      className="px-4 py-2 border focus:border-2 rounded-md w-full text-gray-700 mt-2 focus:outline-none focus:border-purple-600"
    />
  );
};

export default Input;
