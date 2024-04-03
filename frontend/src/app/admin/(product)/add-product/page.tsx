import React from 'react'

import Title from "@/components/Admin/Title";
import NewAddProductPage from "@/screens/Admin/Add/NewAddProductPage";
import AddProductScreen from '@/screens/Admin/Add/AddProductFormScreen';

const AddProduct = () => {
  return (
    <section className="border rounded-md">
      <Title title="صفحه افزودن محصول" link="/admin/add-product" />
      {/* <      NewAddProductPage /> */}
      <AddProductScreen />
    </section>
  )
}

export default AddProduct;