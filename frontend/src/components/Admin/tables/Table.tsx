import { useState, useEffect } from "react";

// Icons
import { CiEdit } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";

// MUI
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

// Store
import { useCategoryStore } from "../../../store/store";

type Categories = {
  name: string;
  _id: string;
};

const CategoryTable = () => {
  const { categories, fetchCategories } = useCategoryStore((state) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Categories>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredCategories, setFilteredCategories] =
    useState<Categories[]>(categories);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    const filteredData = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCategories(filteredData);
  }, [categories, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: keyof Categories) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCategories = filteredCategories.sort((a, b) => {
    const compareResult = a[sortField].localeCompare(b[sortField]);

    if (sortDirection === "asc") {
      return compareResult;
    } else {
      return -compareResult;
    }
  });

  return (
    <div className="bg-white rounded-md pt-8 px-1 sm:px-6 shadow-sm font-body">
      <input
        placeholder="جستجو براساس نام"
        value={searchTerm}
        onChange={handleSearch}
        className="border px-2 py-1.5 rounded-sm"
      />
      <TableContainer component="div" style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort("name")}
                style={{ fontFamily: "Vazirmatn" }}
                className="hover:border-x w-fit"
              ></TableCell>
              <TableCell
                onClick={() => handleSort("name")}
                style={{ fontFamily: "Vazirmatn" }}
                className="hover:border-x flex gap-2"
              >
                نام
                {sortField === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("_id")}
                style={{ fontFamily: "Vazirmatn" }}
                className="hover:border-x"
              >
                آیدی
                {sortField === "_id" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCategories.map((category: Categories) => (
              <TableRow key={category._id}>
                <TableCell style={{ fontFamily: "Vazirmatn" }}>
                  <div className="flex gap-3">
                    <button className="bg-yellow-600 text-white p-1.5 rounded-md text-xl">
                      <CiEdit />
                    </button>
                    <button className="bg-red-600 text-white p-1.5 rounded-md text-lg">
                      <FiTrash2 />
                    </button>
                  </div>
                </TableCell>
                <TableCell style={{ fontFamily: "Vazirmatn" }}>
                  {category.name}
                </TableCell>
                <TableCell style={{ fontFamily: "Vazirmatn" }}>
                  {category._id}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryTable;
