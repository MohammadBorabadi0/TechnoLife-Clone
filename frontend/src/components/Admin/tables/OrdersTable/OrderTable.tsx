import React, { FC, useState } from "react";

import { Paper, Table, TableContainer } from "@mui/material";

import { IOrder } from "@/utils/type";

// components
import Title from "../../Title";

import OrderTableHead from "./OrderTableHead/OrderTableHead";
import OrderTableBody from "./OrderTableBody/OrderTableBody";

interface IProps {
  data: IOrder[];
  title: string;
  url: string;
  linkRouter: string;
}

const columns = [
  { _id: "actions", name: "عملیات" },
  { _id: "status", name: "وضعیت پرداخت" },
  { _id: "createdAt", name: "تاریخ ثبت" },
  { _id: "totalPricesAfterDiscount", name: "مجموع قیمت‌ها پس از تخفیف" },
  { _id: "_id", name: "ID" },
];


const OrderTable: FC<IProps> = ({
  data,
  title,
  linkRouter,
  url,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSort = (columnId: string) => {
    if (orderBy === columnId && order === "asc") {
      setOrder("desc");
    } else {
      setOrderBy(columnId);
      setOrder("asc");
    }
  };

  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedRows = filteredRows?.sort((a, b) => {
    if (order === "asc") {
      return String(a[orderBy as keyof IOrder]).localeCompare(
        String(b[orderBy as keyof IOrder])
      );
    } else {
      return String(b[orderBy as keyof IOrder]).localeCompare(
        String(a[orderBy as keyof IOrder])
      );
    }
  });

  if (data)
    return (
      <div className="flex flex-col gap-5 bg-white rounded-md shadow-lg border px-2 sm:px-6 py-8 min-h-screen">
        <Title title={title} count={data.length} link={url} />
        <div className="flex justify-between items-center">
          <input
            placeholder="جستجو بر اساس نام یا Id"
            value={filter}
            onChange={handleFilterChange}
            className="border p-2 rounded-sm w-full sm:w-1/2 focus:outline-none focus:border-2 focus:border-gray-600"
          />
        </div>
        <Paper>
          <TableContainer>
            <Table>
              <OrderTableHead
                columns={columns}
                orderBy={orderBy}
                order={order}
                handleSort={handleSort}
              />
              <OrderTableBody
                columns={columns}
                sortedRows={sortedRows}
                linkRouter={linkRouter}
              />
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
};

export default OrderTable;
