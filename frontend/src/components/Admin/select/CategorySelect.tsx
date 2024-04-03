import { Dispatch, FC, SetStateAction } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ICategory } from "../../../utils/type";

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
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  categories: ICategory[];
}

const CategoryMultipleSelect: FC<IProps> = ({ category, setCategory, categories }) => {

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-name-label" color="secondary">انتخاب دسته بندی</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          value={category}
          name='category'
          onChange={(e) => setCategory(e.target.value)}
          input={<OutlinedInput label="انتخاب دسته بندی" />}
          color="secondary"
          MenuProps={MenuProps}
        >
          {categories.map((item) => (
            <MenuItem
              key={item._id}
              value={item._id}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategoryMultipleSelect;
