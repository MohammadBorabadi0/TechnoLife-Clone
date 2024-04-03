import { FC } from "react";
import { useRouter } from "next/navigation";

// types
import { IOrder } from "@/utils/type";

// Mui
import { TableCell } from "@mui/material";

// icons
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

// functions 
import {
  En_To_Fa,
  convertToPersianDate,
  getStatusText,
} from "@/utils/functions";

interface IProps {
  column: { _id: string; name: string };
  row: IOrder;
  linkRouter: string;
}

const OrderTableCell: FC<IProps> = ({ column, row, linkRouter }) => {
  const router = useRouter();

  const date = convertToPersianDate(row.createdAt!);

  // ---------------------------------------------------------------------------------------

  // Handle Show Payment Result Status

  const { text, textColor, bgColor } = getStatusText(row.paymentResult.status);

  // -----------------------------------------------------------------------------------------

  return (
    <TableCell key={column._id} className="border text-center">
      {column._id === "actions" ? (
        <div className="flex justify-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => router.push(`${linkRouter}/${row._id}`)}
          >
            <CiEdit />
          </button>
          <button
            className="btn bg-blue-500"
            onClick={() => router.push(`/admin/order-detail/${row._id}`)}
          >
            <FaEye />
          </button>
        </div>
      ) : (
        <div className="whitespace-nowrap text-center">
          {column._id === "status" ? (
            <div className={`flex justify-center`}>
              <p
                className="px-2 py-1 rounded-lg"
                style={{ color: textColor, backgroundColor: bgColor }}
              >
                {text}
              </p>
            </div>
          ) : column._id === "createdAt" ? (
            `${date.persianDayOfWeek} ${date.persianDate}`
          ) : column._id === "totalPricesAfterDiscount" ? (
            En_To_Fa(`${row.totalPricesAfterDiscount?.toLocaleString("fa-IR")}`)
          ) : (
            String(row[column._id as keyof IOrder])
          )}
        </div>
      )}
    </TableCell>
  );
};

export default OrderTableCell;
