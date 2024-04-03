// TableHeadComponent.jsx
import React, { FC } from 'react';
import { TableHead, TableRow } from '@mui/material';
import ProductTableCell from './ProductTableCell';


interface IProps {
  columns: { _id: string; name: string; }[];
  orderBy: string;
  order: "desc" | "asc";
  handleSort: (columnId: string) => void;
}

const ProductTableHead: FC<IProps> = ({ columns, order, orderBy, handleSort }) => {
  return (
    <TableHead className="border">
      <TableRow>
        {columns.map((column) => (
          <ProductTableCell
            key={column._id}
            column={column}
            orderBy={orderBy}
            order={order}
            handleSort={handleSort}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ProductTableHead;
