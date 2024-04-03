import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import React, { FC } from 'react'
import { IColumn } from '@/utils/type';
import UserTableCell from './UserTableCell';

interface IProps {
    columns: IColumn[];
    order: "desc" | "asc";
    orderBy: string;
    handleSort: (columnId: string) => void;
}

const UserTableHead: FC<IProps> = ({ columns, order, orderBy, handleSort }) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <UserTableCell
                        key={column.id}
                        column={column}
                        order={order}
                        orderBy={orderBy}
                        handleSort={handleSort}
                    />
                ))}
            </TableRow>
        </TableHead>
    )
}

export default UserTableHead