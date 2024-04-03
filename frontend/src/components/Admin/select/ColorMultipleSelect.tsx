import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useColorStore } from "@/store/store";
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
  color: string[];
  setColor: React.Dispatch<React.SetStateAction<string[]>>;
  colors: IColor[];
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const MultipleSelectCheckmarks: React.FC<IProps> = ({
  color,
  setColor,
  colors,
}) => {
  console.log({ color });

  const handleChange = (event: SelectChangeEvent<typeof color>) => {
    const {
      target: { value },
    } = event;
    setColor(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          انتخاب رنگ های محصول
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={color}
          onChange={handleChange}
          input={<OutlinedInput label="انتخاب رنگ های محصول" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {colors.map((item) => (
            <MenuItem key={item._id} value={item.colorName}>
              <Checkbox checked={color.indexOf(item.colorName) > -1} />
              <ListItemText primary={item.colorName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCheckmarks;
