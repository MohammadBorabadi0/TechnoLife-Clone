import { FC } from "react";

interface IProps {
  children: string;
}

const Button: FC<IProps> = ({ children }) => {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white w-full rounded-sm py-2"
    >
      {children}
    </button>
  );
};

export default Button;
