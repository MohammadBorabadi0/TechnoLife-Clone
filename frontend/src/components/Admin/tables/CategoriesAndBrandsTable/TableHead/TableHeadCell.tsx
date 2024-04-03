import React, { FC } from 'react';
import { TableCell, TableSortLabel } from '@mui/material'
import { ICategory } from '@/utils/type';

interface IProps {
    column: ICategory;
    order: "desc" | "asc";
    orderBy: string;
    handleSort: (columnId: string) => void;
}

const TableHeadCell: FC<IProps> = ({ column, order, orderBy, handleSort }) => {
    return (
        <TableCell
            key={column._id}
            className="border text-center font-semibold"
        >
            <TableSortLabel
                active={orderBy === column._id}
                direction={orderBy === column._id ? order : "asc"}
                onClick={() => handleSort(column._id)}
            >
                {column.name}
            </TableSortLabel>
        </TableCell>
    )
}

export default TableHeadCell