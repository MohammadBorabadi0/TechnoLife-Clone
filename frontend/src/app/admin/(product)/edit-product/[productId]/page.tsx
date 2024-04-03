import Title from "@/components/Admin/Title";
import EditProductScreen from "@/screens/Admin/Edit/EditProductScreen";

const EditProduct = () => {
  return (
    <section className="rounded border">
      <Title title="صفحه ویرایش محصول" link="/admin/edit-product" />
      <EditProductScreen />
    </section>
  )
};

export default EditProduct;
