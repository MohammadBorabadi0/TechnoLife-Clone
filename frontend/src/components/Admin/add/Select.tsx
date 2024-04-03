import { IBrand, ICategory, IColor } from "@/utils/type";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface SelectProps {
  name: string;
  label: string;
  data: ICategory[] | IColor[] | IBrand[];
  value: string;
  handleChange: (e: SelectChangeEvent<string>) => void;
}

const SelectComponent: FC<SelectProps> = ({ label, name, data, value, handleChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <FormControl sx={{ width: "100%" }}>
        <Select
          id={name}
          name={name}
          color="secondary"
          defaultValue=""
          value={value}
          onChange={handleChange}
        >
          {data.length ? data.map((item) => (
            <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
          )) : (
            <MenuItem value=''>هیچ آیتمی وجود ندارد.</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectComponent;