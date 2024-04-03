import React, { FC, useState } from "react";

import { Paper, Table, TableContainer } from "@mui/material";
import { IBrand, ICategory } from "@/utils/type";

// components
import Title from "../../Title";
import TableHeadComponent from "./TableHead/TableHead";
import TableBodyComponent from "./TableBody/TableBody";

interface IProps {
  data: ICategory[] | null;
  deleteRow: (id: string) => Promise<void>;
  title: string;
  url: string;
  linkRouter: string;
}

const columns = [
  { _id: "actions", name: "عملیات" },
  { _id: "name", name: "نام" },
  { _id: "_id", name: "ID" },
];

const TableComponent: FC<IProps> = ({
  data,
  deleteRow,
  title,
  url,
  linkRouter,
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

  const filteredRows = data?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedRows = filteredRows?.sort((a, b) => {
    if (order === "asc") {
      return String(a[orderBy as keyof ICategory]).localeCompare(
        String(b[orderBy as keyof ICategory])
      );
    } else {
      return String(b[orderBy as keyof ICategory]).localeCompare(
        String(a[orderBy as keyof ICategory])
      );
    }
  });

  const handleDelete = async (id: string) => {
    await deleteRow(id);
  };

  if (sortedRows)
    return (
      <div className="flex flex-col gap-5 bg-white rounded-md shadow-lg px-2 sm:px-6 py-8 min-h-screen">
        <Title title={title} count={data?.length || 0} link={url} />
        <div className="flex justify-between items-center">
          <input
            placeholder="جستجو بر اساس نام یا Id"
            value={filter}
            onChange={handleFilterChange}
            className="border p-2 rounded-sm w-full sm:w-1/2 focus:outline-none focus:border-2 focus:border-gray-600"
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHeadComponent
              columns={columns}
              handleSort={handleSort}
              order={order}
              orderBy={orderBy}
            />

            <TableBodyComponent
              columns={columns}
              sortedRows={sortedRows}
              linkRouter={linkRouter}
              handleDelete={handleDelete}
            />
          </Table>
        </TableContainer>
      </div>
    );
};

export default TableComponent;
