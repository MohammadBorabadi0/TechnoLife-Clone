import OrderTable from "@/components/Admin/tables/OrdersTable/OrderTable";
import { useOrderStore } from "@/store/store";
import { useEffect } from "react";

const ProductListScreen = () => {
  const { allOrders, fetchAllOrders } = useOrderStore((state) => state);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (allOrders)
    return (
      <OrderTable
        data={allOrders}
        title="لیست سفارشات"
        url="/admin/add-order"
        linkRouter="/admin/edit-order"
      />
    );
};

export default ProductListScreen;
