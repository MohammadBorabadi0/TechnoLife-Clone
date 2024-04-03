import React, { FC, useState } from "react";

import { Paper, Table, TableContainer } from "@mui/material";

import { ProductData } from "@/utils/type";

// components
import Title from "../../Title";

import ProductTableHead from "./ProductTableHead/ProductTableHead";
import ProductTableBody from "./ProductTableBody/ProductTableBody";

interface IProps {
  data: ProductData[];
  deleteProduct: (id: string) => Promise<void>;
  title: string;
  url: string;
  linkRouter: string;
}

const columns = [
  { _id: "actions", name: "عملیات" },
  { _id: "name", name: "نام" },
  { _id: "category", name: "دسته‌بندی" },
  { _id: "brand", name: "برند" },
  { _id: "_id", name: "ID" },
];

const ProductTable: FC<IProps> = ({
  data,
  deleteProduct,
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

  const sortedRows = filteredRows.sort((a, b) => {
    if (order === "asc") {
      return String(a[orderBy as keyof ProductData]).localeCompare(
        String(b[orderBy as keyof ProductData])
      );
    } else {
      return String(b[orderBy as keyof ProductData]).localeCompare(
        String(a[orderBy as keyof ProductData])
      );
    }
  });

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

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
            <ProductTableHead
              columns={columns}
              orderBy={orderBy}
              order={order}
              handleSort={handleSort}
            />
            <ProductTableBody
              columns={columns}
              sortedRows={sortedRows}
              linkRouter={linkRouter}
              handleDelete={handleDelete}
            />
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ProductTable;
