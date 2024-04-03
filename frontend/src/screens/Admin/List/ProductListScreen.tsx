import ProductTable from "@/components/Admin/tables/ProductsTable/ProductTable";
import { useProductStore } from "@/store/store";
import { useEffect } from "react";

const ProductListScreen = () => {
  const { products, fetchProducts, deleteProduct } = useProductStore(state => state);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductTable data={products} deleteProduct={deleteProduct}
      title="لیست محصولات"
      url="/admin/add-product"
      linkRouter="/admin/edit-product"
    />
  );
};

export default ProductListScreen;
