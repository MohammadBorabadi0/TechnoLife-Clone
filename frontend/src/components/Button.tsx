import { FC } from "react";

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button type="submit" className="flex justify-center py-3.5 bg-purple-600 text-white rounded font-normal">
      {text}
    </button>
  );
};

export default Button;
