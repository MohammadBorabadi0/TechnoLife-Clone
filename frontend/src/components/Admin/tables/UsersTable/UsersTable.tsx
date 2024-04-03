"use client";

import React, { useEffect, useState } from "react";
import { Paper, Table, TableContainer } from "@mui/material";

// store
import { useUserStore } from "@/store/store";

import { ICategory, IColumn, IUser } from "@/utils/type";
import Title from "../../Title";
import UserTableHead from "./UserTableHead/UserTableHead";
import UserTableBody from "./UserTableBody/UserTableBody";

const columns: IColumn[] = [
  {
    id: "actions",
    name: "عملیات",
  },
  {
    id: "firstName",
    name: "نام",
  },
  {
    id: "email",
    name: "ایمیل",
  },
  {
    id: "isAdmin",
    name: "ادمین",
  },
  {
    id: "_id",
    name: "ID",
  },
];

const UsersTable = () => {
  const { users, fetchUsers, deleteUser } = useUserStore((state) => state);
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

  const filteredRows = users?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedRows = filteredRows?.sort((a, b) => {
    if (order === "asc") {
      return String(a[orderBy as keyof IUser]).localeCompare(
        String(b[orderBy as keyof IUser])
      );
    } else {
      return String(b[orderBy as keyof IUser]).localeCompare(
        String(a[orderBy as keyof IUser])
        // String(a[orderBy as keyof ICategory])
      );
    }
  });

  const handleDelete = async (id: string) => {
    console.log({ id });
    await deleteUser(id);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex flex-col gap-5 bg-white rounded-md shadow-lg px-2 sm:px-6 py-8 min-h-screen">
      <Title title="کاربران" count={users?.length} />
      <div className="flex justify-between items-center">
        <input
          placeholder="جستجو"
          value={filter}
          onChange={handleFilterChange}
          className="border px-2 py-1.5 rounded-sm w-fit focus:outline-none focus:border-2 focus:border-gray-600"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <UserTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            handleSort={handleSort}
          />
          <UserTableBody
            sortedRows={sortedRows}
            columns={columns}
            linkRouter="/admin/edit-user"
            handleDelete={handleDelete}
          />
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
