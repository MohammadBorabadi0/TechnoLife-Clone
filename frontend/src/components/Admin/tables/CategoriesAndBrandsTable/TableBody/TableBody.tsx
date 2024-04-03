import React, { FC, useEffect, useState } from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { ICategory } from '@/utils/type';
import TableBodyCell from './TableBodyCell';

interface IProps {
  columns: { _id: string; name: string; }[];
  sortedRows: ICategory[];
  linkRouter: string;
  handleDelete: (id: string) => Promise<void>;
}

const TableBodyComponent: FC<IProps> = ({ columns, sortedRows, linkRouter, handleDelete }) => {

  if (sortedRows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className='text-right text-base' colSpan={columns.length}>
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
            <TableBodyCell
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
  )
}

export default TableBodyComponent;