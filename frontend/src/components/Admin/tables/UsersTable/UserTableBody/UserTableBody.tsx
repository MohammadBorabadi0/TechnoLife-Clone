import React, { FC } from 'react'
import { IColumn, IUser } from '@/utils/type';
import { TableBody, TableRow } from '@mui/material';
import UserTableCell from './UserTableCell';

interface IProps {
  sortedRows: IUser[];
  columns: IColumn[];
  linkRouter: string;
  handleDelete: (id: string) => Promise<void>;
}

const UserTableBody: FC<IProps> = ({ sortedRows, columns, linkRouter, handleDelete }) => {
  return (

    <TableBody>
      {sortedRows?.map((row, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <UserTableCell
              key={column.id}
              column={column}
              row={row}
              linkRouter={linkRouter}
              handleDelete={handleDelete}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>

    // <TableBody>
    //   {sortedRows?.map((row, index) => (
    //     <TableRow key={index}>
    //       {columns.map((column) => {
    //         <UserTableCell key={column.id}  />
    //       })}
    //     </TableRow>
    //   ))}
    // </TableBody>
  )
}

export default UserTableBody;

// if (column.id === "actions") {
//   return (
//     <TableCell
//       key={column.id}
//       className="flex justify-center gap-3"
//     >
//       <button className='btn btn-primary'>
//         <CiEdit />
//       </button>
//       <button className='btn btn-danger' onClick={() => handleDelete(row._id!)}>
//         <FiTrash2 />
//       </button>
//     </TableCell>
//   );
// } else if (column.id === "isAdmin") {
//   return (
//     <TableCell
//       key={column.id}
//       className="flex justify-center border-x text-2xl"
//     >
//       {row[column.id as keyof IUser] ? (
//         <div className="flex justify-center items-center w-fit rounded-full p-1 bg-green-600 text-white">
//           <TiTick />
//         </div>
//       ) : (
//         <div className="flex justify-center items-center w-fit rounded-full p-1 bg-red-600 text-white">
//           <IoClose />
//         </div>
//       )}
//     </TableCell>
//   );
// } else {
//   return (
//     <TableCell key={column.id} className="border text-center">
//       {row[column.id as keyof IUser]}
//     </TableCell>
//   );
// }