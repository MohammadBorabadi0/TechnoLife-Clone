import React, { FC } from 'react';
import { ICategory } from '@/utils/type';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import TableHeadCell from './TableHeadCell';

interface IProps {
    columns: ICategory[];
    order: "desc" | "asc";
    orderBy: string;
    handleSort: (columnId: string) => void;
}

const TableHeadComponent: FC<IProps> = ({ columns, order, orderBy, handleSort }) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableHeadCell
                        key={column._id}
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

export default TableHeadComponent;