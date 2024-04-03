import React, { FC } from 'react';
import { TableCell, TableSortLabel } from '@mui/material'

interface IProps {
    column: { _id: string; name: string; };
    orderBy: string;
    order: "desc" | "asc";
    handleSort: (columnId: string) => void;
}

const OrderTableCell: FC<IProps> = ({
    column, order, orderBy, handleSort
}) => {
    return (
        <TableCell key={column._id} className="border font-semibold text-center">
            {column.name === "عملیات" ? (
                column.name
            ) : (
                <TableSortLabel
                    active={orderBy === column._id}
                    direction={orderBy === column._id ? order : "asc"}
                    onClick={() => handleSort(column._id)}
                >
                    {column.name}
                </TableSortLabel>
            )}
        </TableCell>
    )
}

export default OrderTableCell