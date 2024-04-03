import React, { FC, useEffect } from 'react'
import { ICategory } from '@/utils/type';
import { TableCell } from '@mui/material';
import { useRouter } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';
import { FiTrash2 } from 'react-icons/fi';
import { useProductStore } from '@/store/store';
import toast from 'react-hot-toast';

interface IProps {
    column: { _id: string; name: string; };
    row: ICategory;
    linkRouter: string;
    handleDelete: (id: string) => Promise<void>;
}

const TableBodyCell: FC<IProps> = ({ column, row, linkRouter, handleDelete }) => {

    const { products, fetchProducts } = useProductStore(state => state);

    const router = useRouter();

    const deleteHandler = (id: string) => {
        const filteredProducts = products
            .filter(product => product.brand === id ||
                product.category === id);

        if (filteredProducts.length > 0) {
            toast.error('این دسته بندی یا برند در تعریف محصول استفاده شده و امکان حذف آن وجود ندارد. لطفا ابتدا محصول مورد نظر را پاک کنید');
        }
        else {
            handleDelete(id);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);

    if (column._id === "actions") {
        return (
            <TableCell
                key={column._id}
                className="flex justify-center gap-3"
            >
                <button
                    className="btn btn-primary"
                    onClick={() =>
                        router.push(`${linkRouter}/${row._id}`)
                    }
                >
                    <CiEdit />
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(row._id)}
                >
                    <FiTrash2 />
                </button>
            </TableCell>
        );
    } else {
        return (
            <TableCell
                key={column._id}
                className="text-center border"
            >
                {row[column._id as keyof ICategory]}
            </TableCell>
        );
    }
}

export default TableBodyCell