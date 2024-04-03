// TableBodyComponent.jsx
import React, { FC } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { IOrder } from "@/utils/type";
import OrderTableCell from "./OrderTableCell";

interface IProps {
  columns: { _id: string; name: string }[];
  sortedRows: IOrder[];
  linkRouter: string;
}

const OrderBodyComponent: FC<IProps> = ({
  columns,
  sortedRows,
  linkRouter,
}) => {
  if (sortedRows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="text-right text-base" colSpan={columns.length}>
            هیچ آیتمی برای نمایش وجود ندارد.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {sortedRows.map((row, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <OrderTableCell
              key={column._id}
              column={column}
              row={row}
              linkRouter={linkRouter}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OrderBodyComponent;
