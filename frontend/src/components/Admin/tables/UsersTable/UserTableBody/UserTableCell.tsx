import { IColumn, IUser } from '@/utils/type';
import { TableCell } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FiTrash2 } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';

interface IProps {
  column: IColumn;
  row: IUser;
  linkRouter: string;
  handleDelete: (id: string) => Promise<void>;
}

const UserTableCell: FC<IProps> = ({ column, row, linkRouter, handleDelete }) => {

  const router = useRouter();

  if (column.id === "actions") {
    return (
      <TableCell
        key={column.id}
        className="flex justify-center gap-3"
      >
        <button
          className='btn btn-primary'
          onClick={() => router.push(`${linkRouter}/${row._id}`)}>
          <CiEdit />
        </button>
        <button className='btn btn-danger' onClick={() => handleDelete(row._id!)}>
          <FiTrash2 />
        </button>
      </TableCell>
    );
  } else if (column.id === "isAdmin") {
    return (
      <TableCell
        key={column.id}
        className="flex justify-center border-x text-2xl"
      >
        {row[column.id as keyof IUser] ? (
          <div className="flex justify-center items-center w-fit rounded-full p-1 bg-green-600 text-white">
            <TiTick />
          </div>
        ) : (
          <div className="flex justify-center items-center w-fit rounded-full p-1 bg-red-600 text-white">
            <IoClose />
          </div>
        )}
      </TableCell>
    );
  } else {
    return (
      <TableCell key={column.id} className="border text-center">
        {row[column.id as keyof IUser]}
      </TableCell>
    );
  }
}

export default UserTableCell