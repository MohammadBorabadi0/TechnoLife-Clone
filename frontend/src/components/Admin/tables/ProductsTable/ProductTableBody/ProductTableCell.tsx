import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

// Store
import {
  useBrandStore,
  useCategoryStore,
} from "@/store/store";

// types
import { ProductData } from "@/utils/type";

// Mui
import { TableCell } from "@mui/material";

// icons
import { CiEdit } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";

interface IProps {
  column: { _id: string; name: string };
  row: ProductData;
  linkRouter: string;
  handleDelete: (id: string) => Promise<void>;
}

const ProductTableCell: FC<IProps> = ({
  column,
  row,
  linkRouter,
  handleDelete,
}) => {
  const { brands, fetchBrands } = useBrandStore((state) => state);
  const { categories, fetchCategories } = useCategoryStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
            className="btn btn-danger"
            onClick={() => handleDelete(row._id!)}
          >
            <FiTrash2 />
          </button>
        </div>
      ) : (
        <div className="whitespace-nowrap">
          {column._id === "brand" && (
            <span>{brands.find((brand) => brand._id === row.brand)?.name}</span>
          )}
          {column._id === "category" && (
            <span>
              {
                categories.find((category) => category._id === row.category)
                  ?.name
              }
            </span>
          )}
          {column._id !== "brand" &&
            column._id !== "category" &&
            String(row[column._id as keyof ProductData])}
        </div>
      )}
    </TableCell>
  );
};

export default ProductTableCell;
