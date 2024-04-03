import { TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

interface IProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = ({
  label,
  type = "text",
  name,
  value,
  handleChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="w-fit">
        {label}
      </label>
      <TextField
        id={name}
        type={type}
        name={name}
        variant="outlined"
        color="secondary"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
