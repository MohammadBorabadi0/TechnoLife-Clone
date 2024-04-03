// TableBodyComponent.jsx
import React, { FC } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { IProduct, ProductData } from "@/utils/type";
import ProductTableCell from "./ProductTableCell";

interface IProps {
  columns: { _id: string; name: string }[];
  sortedRows: ProductData[];
  linkRouter: string;
  handleDelete: (id: string) => Promise<void>;
}

const TableBodyComponent: FC<IProps> = ({
  columns,
  sortedRows,
  linkRouter,
  handleDelete,
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
            <ProductTableCell
              key={column._id}
              column={column}
              row={row}
              linkRouter={linkRouter}
              handleDelete={handleDelete}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;
