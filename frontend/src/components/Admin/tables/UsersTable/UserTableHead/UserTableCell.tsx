import React, { FC } from 'react'
import { IColumn } from '@/utils/type';
import { TableCell, TableSortLabel } from '@mui/material'

interface IProps {
    column: IColumn;
    order: "desc" | "asc";
    orderBy: string;
    handleSort: (columnId: string) => void;
}

const UserTableCell: FC<IProps> = ({ column, order, orderBy, handleSort }) => {
    return (
        <TableCell
            key={column.id}
            className="text-center border font-semibold"
        >
            <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={() => handleSort(column.id)}
            >
                {column.name}
            </TableSortLabel>
        </TableCell>
    )
}

export default UserTableCell