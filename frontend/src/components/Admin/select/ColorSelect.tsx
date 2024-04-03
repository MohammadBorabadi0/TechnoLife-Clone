import { FC } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IColor } from "@/utils/type";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IProps {
  color: string;
  handleChange: (e: any) => void;
  colors: IColor[];
}

const ColorMultipleSelect: FC<IProps> = ({ color, handleChange, colors }) => {
  console.log({ color });

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-name-label" color="secondary">
          انتخاب رنگ
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          value={color}
          onChange={handleChange}
          input={<OutlinedInput label="انتخاب رنگ" />}
          color="secondary"
          MenuProps={MenuProps}
        >
          {colors.map((item) => (
            <MenuItem
              key={item._id}
              value={item.code}
              className="flex justify-between"
            >
              <span>{item.name}</span>
              <span
                style={{ backgroundColor: item.code }}
                className="w-4 h-4 rounded-full"
              ></span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ColorMultipleSelect;
