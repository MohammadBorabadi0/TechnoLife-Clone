import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC, useEffect } from "react";
import { IOrder } from "@/utils/type";
import { useOrderStore } from "@/store/store";

interface IProps {
  order: IOrder;
}

const SelectOrderStatus: FC<IProps> = ({ order }) => {
  const { status, setStatus } = useOrderStore((state) => state);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  useEffect(() => {
    setStatus(order.paymentResult.status);
  }, [order]);

  return (
    <div className="flex flex-col gap-3">
      <span>تغییر وضعیت سفارش</span>
      <FormControl fullWidth>
        <Select value={status} onChange={handleChange}>
          <MenuItem value="awaiting payment">در انتظار پرداخت</MenuItem>
          <MenuItem value="processing">در حال پردازش</MenuItem>
          <MenuItem value="delivered">تحویل داده شده</MenuItem>
          <MenuItem value="returned">مرجوع شده</MenuItem>
          <MenuItem value="canceled and suspended">لغو شده</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectOrderStatus;
